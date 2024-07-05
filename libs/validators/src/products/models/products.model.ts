import { Expose, Type } from 'class-transformer';
import { UserModel } from 'novatori/validators/users/models/user.model';
import { BaseModel } from '../../base/base.model';

export class ProductsModel extends BaseModel {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  price!: number;

  @Expose()
  shop!: string;

  @Type(() => UserModel)
  @Expose()
  user!: UserModel;
}
