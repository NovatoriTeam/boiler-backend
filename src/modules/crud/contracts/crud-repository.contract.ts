import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';
import { BaseModel } from '../models/base.model';
import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export interface CrudRepositoryContract<
  EntityType extends BaseEntity<ModelType>,
  ModelType extends BaseModel<EntityType>,
> {
  _$findAll: (
    applyQueryFilters: QueryHelperInterface,
  ) => Promise<[ModelType[], number]>;
  _$findOne: (id: number) => Promise<ModelType>;
  _$create: (data: ModelType) => Promise<ModelType>;
  _$update: (id: number, data: QueryDeepPartialEntity<ModelType>) => void;
  _$remove: (id: number) => void;
}
