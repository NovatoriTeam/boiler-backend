import { BaseEntity } from '../base.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseRepositoryContract<EntityType extends BaseEntity> {
  findAll: () => Promise<EntityType[]>;
  findOne: (id: number) => Promise<EntityType>;
  create: (data: EntityType) => Promise<EntityType>;
  update: (id: number, data: QueryDeepPartialEntity<EntityType>) => void;
  remove: (id: number) => void;
}
