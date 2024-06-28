import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';
import { BaseModel } from '../models/base.model';
import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export interface CrudRepositoryContract<
  EntityType extends BaseEntity<ModelType>,
  ModelType extends BaseModel<EntityType>,
> {
  findAll: (
    applyQueryFilters: QueryHelperInterface,
  ) => Promise<[ModelType[], number]>;
  findOne: (id: number) => Promise<ModelType>;
  create: (data: ModelType) => Promise<ModelType>;
  update: (id: number, data: QueryDeepPartialEntity<ModelType>) => void;
  remove: (id: number) => void;
}
