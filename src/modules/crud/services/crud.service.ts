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

  async findAll(
    applyQueryFilers: QueryHelperInterface,
  ): Promise<[ModelType[], number]> {
    return await this.baseRepo.findAll(applyQueryFilers);
  }

  async findOne(id: number): Promise<ModelType> {
    return await this.baseRepo.findOne(id);
  }

  async create(dto): Promise<ModelType> {
    return await this.baseRepo.create(dto);
  }

  async update(id: number, body): Promise<ModelType> {
    return await this.baseRepo.update(id, body);
  }

  async remove(id: number): Promise<ModelType> {
    return await this.baseRepo.remove(id);
  }
}
