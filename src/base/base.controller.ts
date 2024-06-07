import { Param, Req } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { BaseService } from './base.service';
import { BaseEntity } from './entities/base.entity';

export abstract class BaseController<
  EntityType extends BaseEntity,
  ServiceType extends BaseService<EntityType, CreateDto, UpdateDto>,
  CreateDto,
  UpdateDto,
> {
  protected constructor(private readonly baseService: ServiceType) {}

  async findAll(@Req() req: any): Promise<[EntityType[], number]> {
    return await this.baseService.findAll(req.queryHelper);
  }

  async findOne(@Param('id') id: string): Promise<EntityType> {
    return await this.baseService.findOne(Number(id));
  }

  async create(dto: CreateDto): Promise<EntityType> {
    return await this.baseService.create(dto);
  }

  async update(id: string, dto: UpdateDto): Promise<UpdateResult> {
    return await this.baseService.update(Number(id), dto);
  }

  async remove(id: string): Promise<UpdateResult> {
    return await this.baseService.remove(Number(id));
  }
}
