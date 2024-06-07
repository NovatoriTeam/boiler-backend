import { DeepPartial, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseServiceContract } from './contracts/base-service.contract';
import { BaseEntity } from './entities/base.entity';
import { QueryHelperInterface } from './interfaces/query-helper.interface';
import { BaseRepository } from './repositories/base.repository';

export class BaseService<EntityType extends BaseEntity, CreateDto, UpdateDto>
  implements BaseServiceContract<EntityType, CreateDto, UpdateDto>
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

  async create(dto: CreateDto): Promise<EntityType> {
    return await this.baseRepo.create(dto as DeepPartial<EntityType>);
  }

  async update(id: number, body: UpdateDto): Promise<UpdateResult> {
    return await this.baseRepo.update(
      id,
      body as QueryDeepPartialEntity<EntityType>,
    );
  }

  async remove(id: number): Promise<UpdateResult> {
    return await this.baseRepo.remove(id);
  }
}
