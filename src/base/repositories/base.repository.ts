import {
  DeepPartial,
  FindManyOptions,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepositoryContract } from '../contracts/base-repository.contract';
import { BaseEntity } from '../entities/base.entity';
import { QueryHelperInterface } from '../interfaces/query-helper.interface';

export class BaseRepository<EntityType extends BaseEntity>
  implements BaseRepositoryContract<EntityType>
{
  constructor(private baseRepository: Repository<EntityType>) {}

  async findAll(
    applyQueryParametersFilter: QueryHelperInterface,
  ): Promise<[EntityType[], number]> {
    const query: FindManyOptions<EntityType> = {};
    applyQueryParametersFilter.toQuery(query);
    return await this.baseRepository.findAndCount(query);
  }

  async findOne(id: number): Promise<EntityType> {
    const query: SelectQueryBuilder<EntityType> = this.baseRepository
      .createQueryBuilder()
      .where('id = :id', { id });

    return await query.getOneOrFail();
  }

  async create(data: DeepPartial<EntityType>): Promise<EntityType> {
    const item: EntityType = this.baseRepository.create(data);
    return await this.baseRepository.save(item);
  }

  async update(
    id: number,
    data: QueryDeepPartialEntity<EntityType>,
  ): Promise<UpdateResult> {
    return await this.baseRepository.update(id, data);
  }

  async remove(id: number): Promise<UpdateResult> {
    return await this.baseRepository.softDelete(id);
  }
}
