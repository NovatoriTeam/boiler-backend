import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    };

    const user = await this.usersRepository.create(data);

    const payload = { id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: '7B6SZB45M9MJ7IHIFUB31I97J3TF4TD6QRDKQLODSMFRSP6UKE',
    });

    return accessToken;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.remove(id);
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
