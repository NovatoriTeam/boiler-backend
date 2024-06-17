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
import { GenerateJwtTokenParamsInterface } from './interfaces/generate-jwt-token-params.interface';

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
      accessToken: this.generateJwtToken({
        userId: newUser.id,
        secret: jwtConfig.jwtSecret,
        expiresIn: jwtConfig.jwtExpiration,
      }),
      refreshToken: this.generateJwtToken({
        userId: newUser.id,
        secret: jwtConfig.refreshJwtSecret,
        expiresIn: jwtConfig.refreshJwtExpiration,
      }),
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

  generateJwtToken(data: GenerateJwtTokenParamsInterface): string {
    const { userId, secret, expiresIn } = data;

    const token: string = this.jwtService.sign(
      { id: userId },
      { secret, expiresIn },
    );
    return token;
  }
}
