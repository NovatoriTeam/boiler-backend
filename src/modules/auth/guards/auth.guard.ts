import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserModel } from 'novatori/validators';
import { RoleEnum } from 'novatori/validators';
import { jwtConfig } from '../../../config/config';
import { UsersRepository } from '../../users/repositories/users.repository';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userRepository: UsersRepository,
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

      const requiredRoles: RoleEnum[] = this.reflector.getAllAndOverride<
        RoleEnum[]
      >(ROLES_KEY, [context.getHandler, context.getClass]);

      const user = await this.userRepository.findUserByIdWithRoles(payload.id);

      return this.validateUserRoles(requiredRoles, user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request['cookies']['accessToken'];
  }

  private validateUserRoles(
    requiredRoles: RoleEnum[],
    user: UserModel,
  ): boolean {
    const userRoles: RoleEnum[] = user.roles.map((role) => role.name);
    const isRouteGuardedWithRole = !!requiredRoles?.length;
    const isAdmin: boolean = userRoles.includes(RoleEnum.Admin);
    const hasRequiredRoles: boolean = requiredRoles?.some?.((role) =>
      userRoles.includes(role),
    );

    return isRouteGuardedWithRole ? hasRequiredRoles : isAdmin;
  }
}
