import { QueryBuilderType } from '../enums/query-builder.type';

export interface BaseServiceContract<EntityType, CreateDto, UpdateDto> {
  findAll: (applyQueryFilters: {
    toQuery: (query: QueryBuilderType) => void;
  }) => Promise<[EntityType[], number]>;
  findOne: (id: number) => Promise<EntityType>;
  create: (data: CreateDto) => Promise<EntityType>;
  update: (id: number, data: UpdateDto) => void;
  remove: (id: number) => void;
}
