import { Expose, Type } from 'class-transformer';
import { AuthTypeEnum } from '../../auth/enums/auth-type.enum';
import { BaseModel } from '../../base/base.model';
import { UserModel } from '../../user/user.model';

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
