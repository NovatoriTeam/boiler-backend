import { Expose, Type, plainToInstance } from 'class-transformer';
import { ProductInterface } from 'novatori/validators/products/interfaces/product.interface';
import { BaseModel } from '../../crud/models/base.model';
import { UserModel } from '../../users/models/user.model';
import { Product } from '../entities/product.entity';

export class ProductsModel
  extends BaseModel<Product>
  implements ProductInterface
{
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
