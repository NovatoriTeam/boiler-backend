import { Param, Req } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BaseService } from '../services/base.service';
import { RequestInterface } from '../types/interfaces/request.interface';

export abstract class BaseController<EntityType extends BaseEntity> {
  protected constructor(
    private readonly baseService: BaseService<EntityType>,
  ) {}

  async findAll(@Req() req: RequestInterface): Promise<[EntityType[], number]> {
    return await this.baseService.findAll(req.queryHelper);
  }

  async findOne(@Param('id') id: string): Promise<EntityType> {
    return await this.baseService.findOne(Number(id));
  }

  async create(dto): Promise<EntityType> {
    return await this.baseService.create(dto);
  }

  async update(id: string, dto): Promise<UpdateResult> {
    return await this.baseService.update(Number(id), dto);
  }

  async remove(id: string): Promise<UpdateResult> {
    return await this.baseService.remove(Number(id));
  }
}
