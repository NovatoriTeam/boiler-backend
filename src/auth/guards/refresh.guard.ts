import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConfig } from '../../config/config';
import { AuthService } from '../auth.service';
import { Refresh } from '../entities/refresh.entity';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';

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

    try {
      const payload: JwtPayloadInterface =
        await this.jwtService.verifyAsync<JwtPayloadInterface>(accessToken, {
          ignoreExpiration: true,
          secret: jwtConfig.jwtSecret,
        });

      const currentRefreshTokenSession: Refresh =
        await this.authService.findOne(payload.id, refreshToken);

      if (!currentRefreshTokenSession) {
        throw new UnauthorizedException();
      }

      const isRefreshTokenValid: boolean =
        this.authService.isRefreshTokenCorrect(
          currentRefreshTokenSession,
          refreshToken,
        );

      request['user'] = payload;
      request['refreshToken'] = refreshToken;

      return isRefreshTokenValid;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
