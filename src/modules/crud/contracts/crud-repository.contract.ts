import { BaseModel } from 'novatori/validators';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export interface CrudRepositoryContract<ModelType extends BaseModel> {
  $_findAll: (
    applyQueryFilters: QueryHelperInterface,
  ) => Promise<[ModelType[], number]>;
  $_findOne: (id: number) => Promise<ModelType>;
  $_create: (data: ModelType) => Promise<ModelType>;
  $_update: (id: number, data: QueryDeepPartialEntity<ModelType>) => void;
  $_remove: (id: number) => void;
}
