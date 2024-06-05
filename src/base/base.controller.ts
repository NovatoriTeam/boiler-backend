import { Param, Query, Req } from '@nestjs/common';
import { BaseEntity } from './entities/base.entity';
import { BaseService } from './base.service';

export abstract class BaseController<
  EntityType extends BaseEntity,
  ServiceType extends BaseService<EntityType, CreateDto, UpdateDto>,
  CreateDto,
  UpdateDto,
> {
  protected constructor(private readonly baseService: ServiceType) {}

  protected async findAll(@Req() req: any) {
    return await this.baseService.findAll(req.queryHelper);
  }

  async findOne(@Param('id') id: string) {
    return await this.baseService.findOne(Number(id));
  }

  async create(dto: CreateDto) {
    return await this.baseService.create(dto);
  }

  async update(id: string, dto: UpdateDto) {
    return await this.baseService.update(Number(id), dto);
  }

  async remove(id: string) {
    return await this.baseService.remove(Number(id));
  }
}
