import { Injectable } from '@nestjs/common';
import { CrudService } from '../../crud/services/crud.service';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService extends CrudService<Product> {
  constructor(private productRepository: ProductsRepository) {
    super(productRepository);
  }
}
