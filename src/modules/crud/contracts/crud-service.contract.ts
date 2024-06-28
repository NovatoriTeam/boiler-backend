import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export interface CrudServiceContract<_EntityType, ModelType> {
  $_findAll: (
    applyQueryFilters: QueryHelperInterface,
  ) => Promise<[ModelType[], number]>;
  $_findOne: (id: number) => Promise<ModelType>;
  $_create: (data) => Promise<ModelType>;
  $_update: (id: number, data) => void;
  $_remove: (id: number) => void;
}
