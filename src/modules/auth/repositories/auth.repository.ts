import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
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
}
