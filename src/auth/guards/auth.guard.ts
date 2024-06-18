import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConfig } from '../../config/config';
import { IS_PUBLIC_KEY } from './public.key';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const accessToken: string = this.extractTokenFromCookie(request);
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload: { id: number } = await this.jwtService.verifyAsync(
        accessToken,
        { secret: jwtConfig.jwtSecret },
      );

      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request['cookies']['accessToken'];
  }
}
