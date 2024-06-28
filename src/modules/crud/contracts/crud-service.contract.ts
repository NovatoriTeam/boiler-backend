import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export interface CrudServiceContract<_EntityType, ModelType> {
  findAll: (
    applyQueryFilters: QueryHelperInterface,
  ) => Promise<[ModelType[], number]>;
  findOne: (id: number) => Promise<ModelType>;
  create: (data) => Promise<ModelType>;
  update: (id: number, data) => void;
  remove: (id: number) => void;
}
