import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { DeepPartial } from 'typeorm';
import { jwtConfig } from '../config/config';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<AuthResponseDto> {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(
      registerUserDto.password,
      salt,
    );

    const data: DeepPartial<User> = {
      ...registerUserDto,
      password: hashedPassword,
    };

    const newUser: User = await this.usersRepository.create(data);

    const result: AuthResponseDto = {
      accessToken: this.generateJwtToken(newUser.id),
      refreshToken: this.generateJwtToken(
        newUser.id,
        jwtConfig.refreshJwtSecret,
        jwtConfig.refreshJwtExpiration,
      ),
    };

    return plainToInstance(AuthResponseDto, result);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersRepository.findByEmail(email);

    const isValidPassword: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    delete user.password;
    return user;
  }

  generateJwtToken(
    userId: number,
    secret?: string,
    expiresIn?: string,
  ): string {
    const jwtSignData: { secret?: string; expiresIn?: string } = {};

    if (secret) {
      Object.assign(jwtSignData, { secret });
    }

    if (expiresIn) {
      Object.assign(jwtSignData, { expiresIn });
    }

    const token: string = this.jwtService.sign({ id: userId }, jwtSignData);
    return token;
  }
}
