import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { QueryBuilderType } from '../../base/enums/query-builder.type';
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

  async findAll(applyQueryParametersFilter: {
    toQuery: (query: QueryBuilderType) => void;
  }): Promise<[Product[], number]> {
    const query: SelectQueryBuilder<Product> =
      this.productRepository.createQueryBuilder('product');
    applyQueryParametersFilter.toQuery(query);
    return await query.getManyAndCount();
  }
}
