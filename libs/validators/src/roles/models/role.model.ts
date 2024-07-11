import { Expose, Type } from 'class-transformer';
import { BaseModel } from '../../base/base.model';
import { RoleEnum } from '../../roles/enums/role.enum';
import { UserModel } from '../../user/user.model';

export class RoleModel extends BaseModel {
  @Expose()
  name!: RoleEnum;

  @Expose()
  userId!: number;

  @Expose()
  @Type(() => UserModel)
  user: UserModel;
}
