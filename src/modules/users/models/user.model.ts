import { Expose } from 'class-transformer';
import { BaseModel } from '../../crud/models/base.model';

export class UserModel extends BaseModel {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;
}
