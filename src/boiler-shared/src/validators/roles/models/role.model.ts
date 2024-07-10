import { Expose, Type } from 'class-transformer';
import { BaseModel } from '../../base/base.model';
import { UserModel } from '../../user/user.model';
import { RoleEnum } from '../enums/role.enum';

export class RoleModel extends BaseModel {
  @Expose()
  name!: RoleEnum;

  @Expose()
  userId!: number;

  @Expose()
  @Type(() => UserModel)
  user: UserModel;
}
