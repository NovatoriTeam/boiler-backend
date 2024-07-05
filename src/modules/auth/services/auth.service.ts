import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import * as dayjs from 'dayjs';
import { DeepPartial } from 'typeorm';
import { jwtConfig } from '../../../config/config';
import { generateRandomString } from '../../../shared/helpers/generateRandomString/generate-random-string';
import { hashString } from '../../../shared/helpers/hashString/hashString';
import { User } from '../../users/entities/user.entity';
import { UsersRepository } from '../../users/repositories/users.repository';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { Refresh } from '../entities/refresh.entity';
import { AuthRepository } from '../repositories/auth.repository';
import { OAuthsEnum } from '../types/enums/o-auths.enum';
import { GenerateJwtTokenParamsInterface } from '../types/interfaces/generate-jwt-token-params.interface';
import { RefreshTokenInterface } from '../types/interfaces/refresh-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async findOne(userId: number, refreshToken: string): Promise<Refresh> {
    const hashedRefreshToken: string = hashString(refreshToken);
    return await this.authRepository.findOne({
      userId,
      refreshToken: hashedRefreshToken,
    });
  }

  async register(registerUserDto: RegisterUserDto): Promise<AuthResponseDto> {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(
      registerUserDto.password,
      salt,
    );

    const data: DeepPartial<User> = {
      ...registerUserDto,
      password: hashedPassword,
    } as DeepPartial<User>;

    const newUser: User = await this.usersRepository.create(data);

    const { refreshToken } = await this.generateAndInsertRefreshToken(
      newUser.id,
    );

    return this.generateAuthResponse(
      {
        userId: newUser.id,
        secret: jwtConfig.jwtSecret,
        expiresIn: jwtConfig.jwtExpiration,
      },
      refreshToken,
    );
  }

  async login(user: User): Promise<AuthResponseDto> {
    const { refreshToken } = await this.generateAndInsertRefreshToken(user.id);

    return this.generateAuthResponse(
      {
        userId: user.id,
        secret: jwtConfig.jwtSecret,
        expiresIn: jwtConfig.jwtExpiration,
      },
      refreshToken,
    );
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

    return this.jwtService.sign({ id: userId }, { secret, expiresIn });
  }

  async handleOAuthLogin(
    data: DeepPartial<User>,
    oAuth: OAuthsEnum,
    oAuthId: string,
  ): Promise<AuthResponseDto> {
    const user: User = await this.usersRepository.findOneByOAuthId(
      oAuth,
      oAuthId,
    );
    let userId: number = user?.id ?? null;

    if (!userId) {
      const newUser: User = await this.usersRepository.create(data);
      userId = newUser.id;
    }

    const { refreshToken, hashedRefreshToken } = this.generateRefreshToken();

    await this.authRepository.create({
      userId,
      refreshToken: hashedRefreshToken,
    } as Refresh);

    return this.generateAuthResponse(
      {
        userId,
        secret: jwtConfig.jwtSecret,
        expiresIn: jwtConfig.jwtExpiration,
      },
      refreshToken,
    );
  }

  public generateAuthResponse(
    tokenData: GenerateJwtTokenParamsInterface,
    refreshToken: string,
  ): AuthResponseDto {
    const response: AuthResponseDto = {
      accessToken: this.generateJwtToken(tokenData),
      refreshToken,
    };

    return plainToInstance(AuthResponseDto, response);
  }

  private generateRefreshToken(): {
    refreshToken: string;
    hashedRefreshToken: string;
  } {
    const refreshToken: string = generateRandomString();
    return {
      refreshToken: refreshToken,
      hashedRefreshToken: hashString(refreshToken),
    };
  }

  async refreshToken(
    userId: number,
    oldToken: string,
  ): Promise<AuthResponseDto> {
    const {
      refreshToken: newToken,
      hashedRefreshToken: newHashedRefreshToken,
    } = this.generateRefreshToken();
    const hashedOldToken: string = hashString(oldToken);

    await this.authRepository.createAndRemove({
      userId,
      refreshToken: hashedOldToken,
      newRefreshToken: newHashedRefreshToken,
    });

    return this.generateAuthResponse(
      {
        userId: userId,
        secret: jwtConfig.jwtSecret,
        expiresIn: jwtConfig.jwtExpiration,
      },
      newToken,
    );
  }

  isRefreshTokenCorrect(
    currentSession: Refresh,
    userRefreshToken: string,
  ): boolean {
    const { refreshToken: refreshTokenFromDatabase, expirationDate } =
      currentSession;
    const hashedRefreshToken: string = hashString(userRefreshToken);

    const isRefreshTokenExpired: boolean = dayjs(new Date()).isAfter(
      dayjs(expirationDate),
    );

    if (isRefreshTokenExpired) {
      throw new UnauthorizedException('Refresh Token Is Expired');
    }

    return refreshTokenFromDatabase === hashedRefreshToken;
  }

  private async generateAndInsertRefreshToken(
    userId: number,
  ): Promise<RefreshTokenInterface> {
    const tokens: RefreshTokenInterface = this.generateRefreshToken();
    await this.authRepository.create({
      userId: userId,
      refreshToken: tokens.hashedRefreshToken,
    });
    return tokens;
  }
}
