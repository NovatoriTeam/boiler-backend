import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseModel } from '../../../boiler-shared/src/validators/base/base.model';
import { CrudServiceContract } from '../contracts/crud-service.contract';
import { BaseEntity } from '../entities/base.entity';
import { CrudRepository } from '../repositories/crud.repository';
import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export class CrudService<
  EntityType extends BaseEntity,
  ModelType extends BaseModel,
> implements CrudServiceContract<EntityType, ModelType>
{
  constructor(
    private readonly baseRepo: CrudRepository<EntityType, ModelType>,
  ) {}

  async $_findAll(
    applyQueryFilers: QueryHelperInterface,
  ): Promise<[ModelType[], number]> {
    return await this.baseRepo.$_findAll(applyQueryFilers);
  }

  async $_findOne(id: number): Promise<ModelType> {
    return await this.baseRepo.$_findOne(id);
  }

  async $_create(dto: unknown): Promise<ModelType> {
    return await this.baseRepo.$_create(dto as ModelType);
  }

  async $_update(id: number, body: unknown): Promise<ModelType> {
    return await this.baseRepo.$_update(
      id,
      body as QueryDeepPartialEntity<ModelType>,
    );
  }

  async $_remove(id: number): Promise<ModelType> {
    return await this.baseRepo.$_remove(id);
  }
}
