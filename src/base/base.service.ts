import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseServiceContract } from './contracts/base-service.contract';
import { BaseEntity } from './entities/base.entity';
import { BaseRepository } from './repositories/base.repository';

export class BaseService<EntityType extends BaseEntity, CreateDto, UpdateDto>
  implements BaseServiceContract<EntityType, CreateDto, UpdateDto>
{
  constructor(private readonly baseRepo: BaseRepository<EntityType>) {}

  async findAll(pagination: any) {
    return await this.baseRepo.findAll(pagination);
  }

  async findOne(id: number) {
    return await this.baseRepo.findOne(id);
  }

  async create(dto: CreateDto) {
    return await this.baseRepo.create(dto as DeepPartial<EntityType>);
  }

  async update(id: number, body: UpdateDto) {
    return await this.baseRepo.update(
      id,
      body as QueryDeepPartialEntity<EntityType>,
    );
  }

  async remove(id: number) {
    return await this.baseRepo.remove(id);
  }
}
