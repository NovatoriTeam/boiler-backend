import { DeepPartial, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CrudServiceContract } from '../contracts/crud-service.contract';
import { BaseEntity } from '../entities/base.entity';
import { CrudRepository } from '../repositories/crud.repository';
import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export class CrudService<EntityType extends BaseEntity>
  implements CrudServiceContract<EntityType>
{
  constructor(private readonly baseRepo: CrudRepository<EntityType>) {}

  async findAll(
    applyQueryFilers: QueryHelperInterface,
  ): Promise<[EntityType[], number]> {
    return await this.baseRepo.findAll(applyQueryFilers);
  }

  async findOne(id: number): Promise<EntityType> {
    return await this.baseRepo.findOne(id);
  }

  async create(dto): Promise<EntityType> {
    return await this.baseRepo.create(dto as DeepPartial<EntityType>);
  }

  async update(id: number, body): Promise<UpdateResult> {
    return await this.baseRepo.update(
      id,
      body as QueryDeepPartialEntity<EntityType>,
    );
  }

  async remove(id: number): Promise<UpdateResult> {
    return await this.baseRepo.remove(id);
  }
}
