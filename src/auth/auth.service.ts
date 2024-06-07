import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Product } from '../products/entities/product.entity';
import { Role } from '../roles/entities/roles.entity';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    products: Product[];
    roles: Role[];
  }> {
    const user: User = await this.usersRepository.findByEmail(email);
    const arePasswordsEqual: boolean = user.password
      ? await bcrypt.compare(password, user.password)
      : false;

    if (arePasswordsEqual) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }
}
