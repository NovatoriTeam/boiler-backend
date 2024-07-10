import { Expose, Type } from 'class-transformer';
import { BaseModel } from '../../base/base.model';
import { UserModel } from '../../user/user.model';
import { AuthTypeEnum } from '../enums/auth-type.enum';

export class AuthModel extends BaseModel {
  @Expose()
  userId!: number;

  @Expose()
  @Type(() => UserModel)
  user!: UserModel;

  @Expose()
  type!: AuthTypeEnum;

  @Expose()
  identifier!: string;

  @Expose()
  metadata!: unknown;
}
