import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '../../../config/config';
import { JwtPayloadInterface } from '../types/interfaces/jwt-payload.interface';

@Injectable()
export class LinkGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const accessToken = request['cookies']['accessToken'];
      const user = await this.jwtService.verifyAsync<JwtPayloadInterface>(
        accessToken,
        {
          secret: jwtConfig.jwtSecret,
        },
      );

      Object.assign(request, {
        session: { ...request['session'], link: true, user },
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
