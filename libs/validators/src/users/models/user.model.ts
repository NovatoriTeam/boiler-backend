import { Expose } from 'class-transformer';
import { BaseModel } from 'novatori/validators';

export class UserModel extends BaseModel {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;
}
