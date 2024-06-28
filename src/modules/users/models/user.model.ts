import { Expose, plainToInstance } from 'class-transformer';
import { BaseModel } from '../../crud/models/base.model';
import { User } from '../entities/user.entity';

export class UserModel extends BaseModel<User> {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  toEntity(): User {
    return plainToInstance(User, this);
  }
}
