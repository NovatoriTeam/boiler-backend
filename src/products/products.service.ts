import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './repositories/products.repository';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { BaseService } from '../base/base.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService extends BaseService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(private productRepository: ProductsRepository) {
    super(productRepository);
  }
}
