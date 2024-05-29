import { BaseServiceContract } from './interfaces/base-service.contract';
import { BaseRepository } from './base.repository';
import { BaseEntity } from './base.entity';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseService<EntityType extends BaseEntity, CreateDto, UpdateDto>
  implements BaseServiceContract<EntityType, CreateDto, UpdateDto>
{
  constructor(private readonly baseRepo: BaseRepository<EntityType>) {}

  async findAll() {
    return await this.baseRepo.findAll();
  }

  async findOne(id: number) {
    return await this.baseRepo.findOne(id);
  }

  async create(dto: CreateDto) {
    return await this.baseRepo.create(dto as DeepPartial<EntityType>);
  }

  async update(id: number, body: UpdateDto) {
    return await this.baseRepo.update(id, body as QueryDeepPartialEntity<EntityType>);
  }

  async remove(id: number) {
    return await this.baseRepo.remove(id);
  }
}
