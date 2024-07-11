import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthTypeEnum } from 'novatori/validators';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async create(data: DeepPartial<Auth>): Promise<Auth> {
    const newAuth = this.authRepository.create(data);
    return await this.authRepository.save(newAuth);
  }

  async setOTP(userId: number, otp: string): Promise<UpdateResult> {
    return await this.authRepository
      .createQueryBuilder()
      .update()
      .set({ metadata: { otp } })
      .where('userId = :userId')
      .andWhere('type = :type')
      .setParameters({
        userId,
        type: AuthTypeEnum.Phone,
      })
      .execute();
  }

  async clearOTP(phone: string): Promise<UpdateResult> {
    const query = await this.authRepository
      .createQueryBuilder()
      .update()
      .set({ metadata: { otp: '' } })
      .where('type = :type')
      .andWhere('identifier = :phone')
      .setParameters({
        type: AuthTypeEnum.Phone,
        phone,
      });

    return await query.execute();
  }
}
