import { QueryHelperInterface } from '../interfaces/query-helper.interface';

export interface BaseServiceContract<EntityType, CreateDto, UpdateDto> {
  findAll: (
    applyQueryFilters: QueryHelperInterface,
  ) => Promise<[EntityType[], number]>;
  findOne: (id: number) => Promise<EntityType>;
  create: (data: CreateDto) => Promise<EntityType>;
  update: (id: number, data: UpdateDto) => void;
  remove: (id: number) => void;
}
