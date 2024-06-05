import { BaseEntity } from '../entities/base.entity';
import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepositoryContract } from '../contracts/base-repository.contract';

export class BaseRepository<EntityType extends BaseEntity>
  implements BaseRepositoryContract<EntityType>
{
  constructor(private baseRepository: Repository<EntityType>) {}

  async findAll(applyQueryParametersFilter: any) {
    const query: any = {};
    applyQueryParametersFilter.toQuery(query);
    return await this.baseRepository.findAndCount(query);
  }

  async findOne(id: number) {
    const query = this.baseRepository
      .createQueryBuilder()
      .where('id = :id', { id });

    return await query.getOneOrFail();
  }

  async create(data: DeepPartial<EntityType>) {
    const item = this.baseRepository.create(data);
    return await this.baseRepository.save(item);
  }

  async update(id: number, data: QueryDeepPartialEntity<EntityType>) {
    return await this.baseRepository.update(id, data);
  }

  async remove(id: number) {
    return await this.baseRepository.softDelete(id);
  }
}
