import { Expose, plainToInstance } from 'class-transformer';
import { BaseModel } from '../../crud/models/base.model';
import { Product } from '../entities/product.entity';

export class ProductsModel extends BaseModel<Product> {
  @Expose()
  id!: number;

  @Expose()
  userId!: number;

  toEntity(): Product {
    return plainToInstance(Product, this);
  }
}
