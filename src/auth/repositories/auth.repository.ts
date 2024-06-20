import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Refresh } from '../entities/refresh.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Refresh) private refreshRepository: Repository<Refresh>,
  ) {}

  async findOne(data: DeepPartial<Refresh>): Promise<Refresh> {
    return await this.refreshRepository.findOneBy({
      refreshToken: data?.refreshToken,
      userId: data?.userId,
    });
  }

  async createAndRemove(
    data: DeepPartial<Refresh>,
    newToken: string,
  ): Promise<Refresh> {
    const currentRefresh: Refresh = await this.findOne(data);

    if (currentRefresh) {
      await this.refreshRepository.remove(currentRefresh);
    }

    const newRefresh: Refresh = this.refreshRepository.create({
      userId: data.userId,
      refreshToken: newToken,
    });

    return await this.refreshRepository.save(newRefresh);
  }

  async create(data: DeepPartial<Refresh>): Promise<Refresh> {
    const newRefresh: Refresh = this.refreshRepository.create(data);
    return await this.refreshRepository.save(newRefresh);
  }
}
