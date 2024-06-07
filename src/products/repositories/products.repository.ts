import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from '../../base/repositories/base.repository';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }

  async findAll(applyQueryParametersFilter: any): Promise<[Product[], number]> {
    const query: SelectQueryBuilder<Product> =
      this.productRepository.createQueryBuilder('product');
    applyQueryParametersFilter.toQuery(query);
    console.log(query.getSql());
    return await query.getManyAndCount();
  }
}
