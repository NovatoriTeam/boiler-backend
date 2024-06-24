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
import { RoleEnum } from '../../roles/enums/role.enum';
import { User } from '../../users/entities/user.entity';
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

      const user: User = await this.userRepository.findUserByIdWithRoles(
        payload.id,
      );

      return this.validateUserRoles(requiredRoles, user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request['cookies']['accessToken'];
  }

  private validateUserRoles(requiredRoles: RoleEnum[], user: User): boolean {
    const userRoles: RoleEnum[] = user.roles.map((role) => role.name);
    const isRouteGuardedWithRole: boolean = !!requiredRoles?.length;
    const isAdmin: boolean = userRoles.includes(RoleEnum.Admin);
    const hasRequiredRoles: boolean = requiredRoles?.some?.((role) =>
      userRoles.includes(role),
    );

    return isRouteGuardedWithRole ? hasRequiredRoles : isAdmin;
  }
}
