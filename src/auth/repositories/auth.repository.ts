import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Refresh } from '../entities/refresh.entity';
import { AuthParamsInterface } from '../interfaces/auth-params.interface';
import { CreateAndRemoveParamsInterface } from '../interfaces/create-and-remove-params.interface';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Refresh) private refreshRepository: Repository<Refresh>,
  ) {}

  async findOne(data: AuthParamsInterface): Promise<Refresh> {
    return await this.refreshRepository.findOneBy({
      refreshToken: data?.refreshToken,
      userId: data?.userId,
    });
  }

  async createAndRemove(
    data: CreateAndRemoveParamsInterface,
  ): Promise<Refresh> {
    const { newRefreshToken, refreshToken, userId } = data;

    const currentRefresh: Refresh = await this.findOne({
      refreshToken,
      userId,
    });

    if (currentRefresh) {
      await this.refreshRepository.remove(currentRefresh);
    }

    const newRefresh: Refresh = this.refreshRepository.create({
      userId: data.userId,
      refreshToken: newRefreshToken,
    });

    return await this.refreshRepository.save(newRefresh);
  }

  async create(data: DeepPartial<Refresh>): Promise<Refresh> {
    const newRefresh: Refresh = this.refreshRepository.create(data);
    return await this.refreshRepository.save(newRefresh);
  }
}
