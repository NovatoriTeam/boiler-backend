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

  async _$findAll(
    applyQueryFilers: QueryHelperInterface,
  ): Promise<[ModelType[], number]> {
    return await this.baseRepo._$findAll(applyQueryFilers);
  }

  async _$findOne(id: number): Promise<ModelType> {
    return await this.baseRepo._$findOne(id);
  }

  async _$create(dto): Promise<ModelType> {
    return await this.baseRepo._$create(dto);
  }

  async _$update(id: number, body): Promise<ModelType> {
    return await this.baseRepo._$update(id, body);
  }

  async _$remove(id: number): Promise<ModelType> {
    return await this.baseRepo._$remove(id);
  }
}
