import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  DeleteResult,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AuthTypeEnum } from '../../auth/types/enums/auth-type.enum';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async create(user: DeepPartial<User>): Promise<User> {
    const newUser: User = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, user: DeepPartial<User>): Promise<UpdateResult> {
    const data = { ...user };

    return await this.usersRepository
      .createQueryBuilder('user')
      .update()
      .set(data as QueryDeepPartialEntity<User>)
      .where('user.id = :id', { id })
      .execute();
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async findByAuthIdentifier(
    type: AuthTypeEnum,
    identifier: string,
  ): Promise<User> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.auths', 'auth')
      .where('auth.identifier = :identifier', { identifier })
      .andWhere('auth.type = :type', { type })
      .getOneOrFail();
  }

  async findUserByIdWithRoles(id: number): Promise<User> {
    const query: SelectQueryBuilder<User> = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.id = :id', { id });

    return await query.getOneOrFail();
  }
}
