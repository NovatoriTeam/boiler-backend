import { Injectable } from '@nestjs/common';
import { BaseService } from '../../base/services/base.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';

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
