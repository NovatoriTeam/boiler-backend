import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRepository } from '../../crud/repositories/crud.repository';
import { Product } from '../entities/product.entity';
import { ProductsModel } from '../models/products.model';

@Injectable()
export class ProductsRepository extends CrudRepository<Product, ProductsModel> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}
