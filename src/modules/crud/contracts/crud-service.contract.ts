import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export interface CrudServiceContract<_EntityType, ModelType> {
  _$findAll: (
    applyQueryFilters: QueryHelperInterface,
  ) => Promise<[ModelType[], number]>;
  _$findOne: (id: number) => Promise<ModelType>;
  _$create: (data) => Promise<ModelType>;
  _$update: (id: number, data) => void;
  _$remove: (id: number) => void;
}
