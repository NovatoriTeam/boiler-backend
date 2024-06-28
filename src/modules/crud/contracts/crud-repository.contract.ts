import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';
import { BaseModel } from '../models/base.model';
import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export interface CrudRepositoryContract<
  EntityType extends BaseEntity<ModelType>,
  ModelType extends BaseModel<EntityType>,
> {
  $_findAll: (
    applyQueryFilters: QueryHelperInterface,
  ) => Promise<[ModelType[], number]>;
  $_findOne: (id: number) => Promise<ModelType>;
  $_create: (data: ModelType) => Promise<ModelType>;
  $_update: (id: number, data: QueryDeepPartialEntity<ModelType>) => void;
  $_remove: (id: number) => void;
}
