import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  DeleteResult,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { OAuthsEnum } from '../../auth/types/enums/o-auths.enum';
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

    if (user.oAuths) {
      Object.assign(data, {
        oAuths: () =>
          `jsonb_set(preferences, '{${Object.keys(user.oAuths).join(',')}}', '${JSON.stringify(user.oAuths)}', true)`,
      });
    }

    return await this.usersRepository
      .createQueryBuilder('user')
      .update()
      .set(data)
      .execute();
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async findOneByOAuthId(oAuth: OAuthsEnum, id: string): Promise<User> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where(`user.oAuths ->>'${oAuth}' = :id`, { id })
      .getOne();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async findUserByIdWithRoles(id: number): Promise<User> {
    const query: SelectQueryBuilder<User> = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.id = :id', { id });

    return await query.getOneOrFail();
  }
}
