import { Param, Req } from '@nestjs/common';
import { BaseModel } from '../../../boiler-shared/src/validators/base/base.model';
import { BaseEntity } from '../entities/base.entity';
import { CrudService } from '../services/crud.service';
import { RequestInterface } from '../types/interfaces/request.interface';

export abstract class CrudController<
  EntityType extends BaseEntity,
  ModelType extends BaseModel,
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
    return await this.baseService.$_findAll(req.queryHelper);
  }

  async findOne(@Param('id') id: string): Promise<ModelType> {
    return await this.baseService.$_findOne(Number(id));
  }

  async create(dto: unknown): Promise<ModelType> {
    return await this.baseService.$_create(dto);
  }

  async update(id: string, dto: unknown): Promise<ModelType> {
    return await this.baseService.$_update(Number(id), dto);
  }

  async remove(id: string): Promise<ModelType> {
    return await this.baseService.$_remove(Number(id));
  }
}
