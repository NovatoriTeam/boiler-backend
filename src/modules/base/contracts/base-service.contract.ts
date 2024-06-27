import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export interface BaseServiceContract<EntityType> {
  findAll: (
    applyQueryFilters: QueryHelperInterface,
  ) => Promise<[EntityType[], number]>;
  findOne: (id: number) => Promise<EntityType>;
  create: (data) => Promise<EntityType>;
  update: (id: number, data) => void;
  remove: (id: number) => void;
}
