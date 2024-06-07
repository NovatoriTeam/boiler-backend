import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';
import { QueryHelperInterface } from '../interfaces/query-helper.interface';

export interface BaseRepositoryContract<EntityType extends BaseEntity> {
  findAll: (
    applyQueryFilters: QueryHelperInterface,
  ) => Promise<[EntityType[], number]>;
  findOne: (id: number) => Promise<EntityType>;
  create: (data: EntityType) => Promise<EntityType>;
  update: (id: number, data: QueryDeepPartialEntity<EntityType>) => void;
  remove: (id: number) => void;
}
