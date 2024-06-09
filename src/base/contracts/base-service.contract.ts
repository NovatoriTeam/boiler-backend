import { BaseEntity } from '../entities/base.entity';

export interface BaseServiceContract<
  EntityType extends BaseEntity,
  CreateDto,
  UpdateDto,
> {
  findAll: (pagination: any) => Promise<[EntityType[], number]>;
  findOne: (id: number) => Promise<EntityType>;
  create: (data: CreateDto) => Promise<EntityType>;
  update: (id: number, data: UpdateDto) => void;
  remove: (id: number) => void;
}
