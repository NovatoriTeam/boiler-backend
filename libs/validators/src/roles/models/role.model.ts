import { Expose, Type } from 'class-transformer';
import { BaseModel, UserModel } from 'novatori/validators';
import { RoleEnum } from 'novatori/validators';

export class RoleModel extends BaseModel {
  @Expose()
  name!: RoleEnum;

  @Expose()
  userId!: number;

  @Expose()
  @Type(() => UserModel)
  user: UserModel;
}
