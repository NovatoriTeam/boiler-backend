import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/repositories/base.repository';

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }

  async findAll(applyQueryParametersFilter: any) {
    const query = this.productRepository.createQueryBuilder('product');
    applyQueryParametersFilter.toQuery(query);
    console.log(query.getSql());
    return await query.getManyAndCount();
  }
}
