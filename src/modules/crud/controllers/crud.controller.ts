import { Param, Req } from '@nestjs/common';
import { BaseEntity } from '../entities/base.entity';
import { BaseModel } from '../models/base.model';
import { CrudService } from '../services/crud.service';
import { RequestInterface } from '../types/interfaces/request.interface';

export abstract class CrudController<
  EntityType extends BaseEntity<ModelType>,
  ModelType extends BaseModel<EntityType>,
> {
  protected constructor(
    private readonly baseService: CrudService<EntityType, ModelType>,
  ) {}

  abstract findAllController(req: RequestInterface);

  abstract findOneController(id: string);

  abstract createController(dto);

  abstract updateController(id: string, dto);

  abstract removeController(id: string);

  async findAll(@Req() req: RequestInterface): Promise<[ModelType[], number]> {
    return await this.baseService._$findAll(req.queryHelper);
  }

  async findOne(@Param('id') id: string): Promise<ModelType> {
    return await this.baseService._$findOne(Number(id));
  }

  async create(dto): Promise<ModelType> {
    return await this.baseService._$create(dto);
  }

  async update(id: string, dto): Promise<ModelType> {
    return await this.baseService._$update(Number(id), dto);
  }

  async remove(id: string): Promise<ModelType> {
    return await this.baseService._$remove(Number(id));
  }
}
