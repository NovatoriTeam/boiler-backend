import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  DeleteResult,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
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
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['auths'],
    });
  }

  async create(user: DeepPartial<User>): Promise<User> {
    const newUser: User = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, data: DeepPartial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (data?.auths) {
      data.auths = [...user.auths, ...data.auths];
    }

    const updateUserData = { ...user, ...data };

    return await this.usersRepository.save(updateUserData);
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
      .getOne();
  }

  async findUserByIdWithRoles(id: number): Promise<User> {
    const query: SelectQueryBuilder<User> = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.id = :id', { id });

    return await query.getOneOrFail();
  }
}
