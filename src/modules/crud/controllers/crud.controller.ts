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

  async findAll(@Req() req: RequestInterface): Promise<[ModelType[], number]> {
    return await this.baseService.findAll(req.queryHelper);
  }

  async findOne(@Param('id') id: string): Promise<ModelType> {
    return await this.baseService.findOne(Number(id));
  }

  async create(dto): Promise<ModelType> {
    return await this.baseService.create(dto);
  }

  async update(id: string, dto): Promise<ModelType> {
    return await this.baseService.update(Number(id), dto);
  }

  async remove(id: string): Promise<ModelType> {
    return await this.baseService.remove(Number(id));
  }
}
