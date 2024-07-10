import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserModel } from '../../../boiler-shared/src/validators/user/user.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<UserModel> {
    const user: UserModel = await this.authService.validateLocalUser(
      email,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
