import { DeepPartial, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseServiceContract } from '../contracts/base-service.contract';
import { BaseEntity } from '../entities/base.entity';
import { BaseRepository } from '../repositories/base.repository';
import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export class BaseService<EntityType extends BaseEntity>
  implements BaseServiceContract<EntityType>
{
  constructor(private readonly baseRepo: BaseRepository<EntityType>) {}

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
