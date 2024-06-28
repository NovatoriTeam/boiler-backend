import { CrudServiceContract } from '../contracts/crud-service.contract';
import { BaseEntity } from '../entities/base.entity';
import { BaseModel } from '../models/base.model';
import { CrudRepository } from '../repositories/crud.repository';
import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export class CrudService<
  EntityType extends BaseEntity<ModelType>,
  ModelType extends BaseModel<EntityType>,
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

  async $_create(dto): Promise<ModelType> {
    return await this.baseRepo.$_create(dto);
  }

  async $_update(id: number, body): Promise<ModelType> {
    return await this.baseRepo.$_update(id, body);
  }

  async $_remove(id: number): Promise<ModelType> {
    return await this.baseRepo.$_remove(id);
  }
}
