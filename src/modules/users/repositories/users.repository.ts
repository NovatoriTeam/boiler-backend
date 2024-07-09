import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { AuthTypeEnum, UserModel } from 'novatori/validators';
import {
  DeepPartial,
  DeleteResult,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
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
      relations: { auths: true },
    });
  }

  async create(user: DeepPartial<User>): Promise<UserModel> {
    const newUser: User = this.usersRepository.create(user);
    return plainToInstance(UserModel, await this.usersRepository.save(newUser));
  }

  async update(id: number, data: DeepPartial<User>): Promise<UserModel> {
    const user = await this.findOne(id);
    if (data?.auths) {
      data.auths = [...user.auths, ...data.auths];
    }

    const updateUserData = { ...user, ...data };

    return plainToInstance(
      UserModel,
      await this.usersRepository.save(updateUserData),
    );
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async findByAuthIdentifier(
    type: AuthTypeEnum,
    identifier: string,
  ): Promise<UserModel> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.auths', 'auth')
      .where('auth.identifier = :identifier', { identifier })
      .andWhere('auth.type = :type', { type })
      .getOne();

    return plainToInstance(UserModel, user);
  }

  async findUserByIdWithRoles(id: number): Promise<UserModel> {
    const query: SelectQueryBuilder<User> = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.id = :id', { id });

    const user = await query.getOneOrFail();
    return plainToInstance(UserModel, user);
  }
}
