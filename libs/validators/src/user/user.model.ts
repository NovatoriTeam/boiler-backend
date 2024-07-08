import { Expose } from 'class-transformer';
import { BaseModel } from '../base/base.model';

export class UserModel extends BaseModel {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;
}
