import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';

export interface BaseRepositoryContract<EntityType extends BaseEntity> {
  findAll: (pagination: any) => Promise<[EntityType[], number]>;
  findOne: (id: number) => Promise<EntityType>;
  create: (data: EntityType) => Promise<EntityType>;
  update: (id: number, data: QueryDeepPartialEntity<EntityType>) => void;
  remove: (id: number) => void;
}
