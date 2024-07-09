import { Expose, Type } from 'class-transformer';
import { BaseModel, UserModel } from 'novatori/validators';
import { AuthTypeEnum } from 'novatori/validators';

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
