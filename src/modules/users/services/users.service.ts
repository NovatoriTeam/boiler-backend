import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from 'boiler-shareds';
import { DeleteResult } from 'typeorm';
import { UserModel } from '../../../boiler-shared/src/validators/user/user.model';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const data: Partial<User> = {
      ...createUserDto,
    } as Partial<User>;
    return await this.usersRepository.create(data);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserModel> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.remove(id);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
