import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConfig } from '../../../config/config';
import { Refresh } from '../entities/refresh.entity';
import { AuthService } from '../services/auth.service';
import { JwtPayloadInterface } from '../types/interfaces/jwt-payload.interface';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const accessToken: string = request.cookies['accessToken'];
    const refreshToken: string = request.cookies['refreshToken'];

    const payload: JwtPayloadInterface =
      await this.jwtService.verifyAsync<JwtPayloadInterface>(accessToken, {
        ignoreExpiration: true,
        secret: jwtConfig.jwtSecret,
      });

    const currentRefreshTokenSession: Refresh = await this.authService.findOne(
      payload.id,
      refreshToken,
    );

    if (!currentRefreshTokenSession) {
      throw new UnauthorizedException();
    }

    const isRefreshTokenValid: boolean = this.authService.isRefreshTokenCorrect(
      currentRefreshTokenSession,
      refreshToken,
    );

    request['user'] = payload;
    request['refreshToken'] = refreshToken;

    return isRefreshTokenValid;
  }
}
