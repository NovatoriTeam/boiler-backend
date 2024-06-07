import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';
import { QueryBuilderType } from '../enums/query-builder.type';

export interface BaseRepositoryContract<EntityType extends BaseEntity> {
  findAll: (applyQueryFilters: {
    toQuery: (query: QueryBuilderType) => void;
  }) => Promise<[EntityType[], number]>;
  findOne: (id: number) => Promise<EntityType>;
  create: (data: EntityType) => Promise<EntityType>;
  update: (id: number, data: QueryDeepPartialEntity<EntityType>) => void;
  remove: (id: number) => void;
}
