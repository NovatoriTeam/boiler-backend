import { Injectable } from '@nestjs/common';
import { BaseService } from '../../base/services/base.service';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(private productRepository: ProductsRepository) {
    super(productRepository);
  }
}
