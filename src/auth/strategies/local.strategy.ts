import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Product } from '../../products/entities/product.entity';
import { Role } from '../../roles/entities/roles.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<{ id: number; firstName: string }> {
    const user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      products: Product[];
      roles: Role[];
    } = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
