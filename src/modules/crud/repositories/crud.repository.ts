import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CrudRepositoryContract } from '../contracts/crud-repository.contract';
import { BaseEntity } from '../entities/base.entity';
import { BaseModel } from '../models/base.model';
import { QueryHelperInterface } from '../types/interfaces/query-helper.interface';

export class CrudRepository<
  EntityType extends BaseEntity<ModelType>,
  ModelType extends BaseModel<EntityType>,
> implements CrudRepositoryContract<EntityType, ModelType>
{
  constructor(private baseRepository: Repository<EntityType>) {}

  async $_findAll(
    applyQueryParametersFilter: QueryHelperInterface,
  ): Promise<[ModelType[], number]> {
    const query: SelectQueryBuilder<EntityType> =
      this.baseRepository.createQueryBuilder('items');
    applyQueryParametersFilter?.toQuery?.(query);

    const res: [EntityType[], number] = await query.getManyAndCount();
    const returnable: ModelType[] = res[0].map((r) => r.toModel());
    return [returnable, res[1]];
  }

  async $_findOne(id: number): Promise<ModelType> {
    const query: SelectQueryBuilder<EntityType> = this.baseRepository
      .createQueryBuilder()
      .where('id = :id', { id });

    const res: EntityType = await query.getOneOrFail();
    return res.toModel();
  }

  async $_create(data: ModelType): Promise<ModelType> {
    const item: EntityType = this.baseRepository.create(
      data as unknown as DeepPartial<EntityType>,
    );
    const res: EntityType = await this.baseRepository.save(item);
    return res.toModel();
  }

  async $_update(
    id: number,
    data: QueryDeepPartialEntity<ModelType>,
  ): Promise<ModelType> {
    await this.baseRepository.update(
      id,
      data as unknown as QueryDeepPartialEntity<EntityType>,
    );
    return await this.$_findOne(id);
  }

  async $_remove(id: number): Promise<ModelType> {
    await this.baseRepository.softDelete(id);
    return await this.$_findOne(id);
  }
}
