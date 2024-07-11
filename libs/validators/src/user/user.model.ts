import { Expose, Type } from 'class-transformer';
import { AuthModel } from '../auth/models/auth.model';
import { BaseModel } from '../base/base.model';
import { RoleModel } from '../roles/models/role.model';

export class UserModel extends BaseModel {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  email!: string;

  @Expose()
  @Type(() => AuthModel)
  auths!: AuthModel[];

  @Expose()
  roles!: RoleModel[];

  public getAuths(): AuthModel[] {
    return this.auths;
  }
}
