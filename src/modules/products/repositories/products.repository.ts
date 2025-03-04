import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsModel } from 'novatori/validators';
import { Repository } from 'typeorm';
import { CrudRepository } from '../../crud/repositories/crud.repository';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsRepository extends CrudRepository<Product, ProductsModel> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository, ProductsModel);
  }
}
