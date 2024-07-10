import { Expose, Type } from 'class-transformer';
import { BaseModel } from '../../base/base.model';
import { UserModel } from '../../user/user.model';

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
