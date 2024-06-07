import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from 'boiler-shareds';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

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

  async create(createUserDto: CreateUserDto): Promise<string> {
    const data: {
      password: string;
      firstName: string;
      lastName: string;
      email: string;
    } = {
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    };

    const user: User = await this.usersRepository.create(data);

    const payload: { id: number } = { id: user.id };
    const accessToken: string = this.jwtService.sign(payload, {
      secret: '7B6SZB45M9MJ7IHIFUB31I97J3TF4TD6QRDKQLODSMFRSP6UKE',
    });

    return accessToken;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
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
