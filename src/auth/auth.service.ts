import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/repositories/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);
    const arePasswordsEqual = user.password
      ? await bcrypt.compare(password, user.password)
      : false;

    if (arePasswordsEqual) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }
}
