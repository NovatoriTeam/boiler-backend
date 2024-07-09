import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import * as dayjs from 'dayjs';
import { Response } from 'express';
import { AuthTypeEnum, UserModel } from 'novatori/validators';
import { corsConfig, jwtConfig, redirectConfig } from '../../../config/config';
import { generateRandomString } from '../../../shared/helpers/generateRandomString/generate-random-string';
import { hashString } from '../../../shared/helpers/hashString/hashString';
import { User } from '../../users/entities/user.entity';
import { UsersRepository } from '../../users/repositories/users.repository';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { Auth } from '../entities/auth.entity';
import { Refresh } from '../entities/refresh.entity';
import { AuthRepository } from '../repositories/auth.repository';
import { RefreshRepository } from '../repositories/refresh.repository';
import { GenerateJwtTokenParamsInterface } from '../types/interfaces/generate-jwt-token-params.interface';
import { JwtPayloadInterface } from '../types/interfaces/jwt-payload.interface';
import { ILocalAuthData } from '../types/interfaces/local-auth-data.interface';
import { OAuthRequestInterface } from '../types/interfaces/o-auth-request-interface';
import { RefreshTokenInterface } from '../types/interfaces/refresh-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private refreshRepository: RefreshRepository,
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async findOne(userId: number, refreshToken: string): Promise<Refresh> {
    const hashedRefreshToken: string = hashString(refreshToken);
    return await this.refreshRepository.findOne({
      userId,
      refreshToken: hashedRefreshToken,
    });
  }

  async register(registerUserDto: RegisterUserDto): Promise<AuthResponseDto> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerUserDto.password, salt);

    const auth = new Auth();
    auth.type = AuthTypeEnum.Local;
    auth.identifier = registerUserDto.email;
    auth.metadata = { password: hashedPassword };

    const data = { ...registerUserDto, auths: [auth] };
    const newUser = await this.usersRepository.create(data);

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

  async validateLocalUser(email: string, password: string): Promise<UserModel> {
    const user: UserModel = await this.usersRepository.findByAuthIdentifier(
      AuthTypeEnum.Local,
      email,
    );

    const isValidPassword: boolean = await bcrypt.compare(
      password,
      (user.getAuths()[0].metadata as ILocalAuthData).password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    delete (user.getAuths()[0].metadata as ILocalAuthData).password;
    return user;
  }

  generateJwtToken(data: GenerateJwtTokenParamsInterface): string {
    const { userId, secret, expiresIn } = data;

    return this.jwtService.sign({ id: userId }, { secret, expiresIn });
  }

  async handleOAuthLogin(
    req: OAuthRequestInterface,
  ): Promise<AuthResponseDto | void> {
    const user = await this.usersRepository.findByAuthIdentifier(
      req.user.data.getAuths()[0].type,
      req.user.data.getAuths()[0].identifier,
    );
    let userId: number = user?.id ?? null;

    if (!userId) {
      const newUser: UserModel = await this.usersRepository.create(
        req.user.data,
      );
      userId = newUser.id;
    }

    const { refreshToken, hashedRefreshToken } = this.generateRefreshToken();

    await this.refreshRepository.create({
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

    await this.refreshRepository.createAndUpdate({
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
    await this.refreshRepository.create({
      userId: userId,
      refreshToken: tokens.hashedRefreshToken,
    });
    return tokens;
  }

  async handleOAuthCallback(
    req: OAuthRequestInterface,
    res: Response,
    redirectUrl: string,
  ): Promise<void> {
    const isLinkingAccount = req.user.link;

    if (isLinkingAccount) {
      return await this.handleOAuthAccountLinking(req, res);
    }

    const { accessToken, refreshToken } = (await this.handleOAuthLogin(
      req,
    )) as AuthResponseDto;

    const cookieExpirationDate: Date = new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000,
    ); // 1 year in milliseconds

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      expires: cookieExpirationDate,
      domain: corsConfig.baseDomain,
      secure: true,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: cookieExpirationDate,
      secure: true,
      domain: corsConfig.baseDomain,
    });

    res.redirect(redirectUrl);
  }

  private async handleOAuthAccountLinking(
    req: OAuthRequestInterface,
    res: Response,
  ): Promise<void> {
    const accessToken = req['cookies']?.['accessToken'];
    const payload = await this.jwtService.verifyAsync<JwtPayloadInterface>(
      accessToken,
      { secret: jwtConfig.jwtSecret },
    );

    const { type, identifier } = req.user.data.getAuths()[0];

    const user = await this.usersRepository.findByAuthIdentifier(
      type,
      identifier,
    );

    const isAccountAlreadyInUse = user && user.id !== payload.id;

    if (!isAccountAlreadyInUse) {
      await this.usersRepository.update(payload.id, {
        auths: req.user.data.getAuths(),
      });
    }

    res.redirect(redirectConfig.homePageUrl);
  }
}
