import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.key';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.key';
import { UsersRepository } from '../../../users/repositories/users.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);


    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);



    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_USER_SECRET,
      });


      request['user'] = payload;

      const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!roles) {
        return true;
      }

      const user = await this.usersRepository.findUserByIdWithRoles(payload.id);
      return roles.some((role) =>
        user.roles?.map((r) => r.name).includes(role.name),
      );
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: {
    cookies: { accessToken: string };
  }): string | undefined {
    const [type, token] = request['headers']['authorization'].split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
