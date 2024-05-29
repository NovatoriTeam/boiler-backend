import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async create(user: DeepPartial<User>) {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, user: DeepPartial<User>) {
    return await this.usersRepository.update(id, user);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }

  async findByEmail(email: string) {
    const query = this.usersRepository
      .createQueryBuilder()
      .select(['*'])
      .where('email = :email', { email });

    return await query.getOneOrFail();
  }

  async findUserByIdWithRoles(id: number) {
    const query = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('id = :id', { id });

    return await query.getOneOrFail();
  }
}
