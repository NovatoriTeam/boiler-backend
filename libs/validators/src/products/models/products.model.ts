import { Expose, Type, plainToInstance } from 'class-transformer';
import { BaseModel } from '../../../../../src/modules/crud/models/base.model';
import { Product } from '../../../../../src/modules/products/entities/product.entity';
import { UserModel } from '../../../../../src/modules/users/models/user.model';

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

  toEntity(): Product {
    return plainToInstance(Product, this);
  }
}
