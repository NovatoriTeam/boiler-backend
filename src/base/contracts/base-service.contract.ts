export interface BaseServiceContract<EntityType, CreateDto, UpdateDto> {
  findAll: (pagination: any) => Promise<[EntityType[], number]>;
  findOne: (id: number) => Promise<EntityType>;
  create: (data: CreateDto) => Promise<EntityType>;
  update: (id: number, data: UpdateDto) => void;
  remove: (id: number) => void;
}
