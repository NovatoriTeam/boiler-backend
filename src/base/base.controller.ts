import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { CreateProductDto } from '../products/dtos/create-product.dto';

export abstract class BaseController<
  EntityType extends BaseEntity,
  ServiceType extends BaseService<EntityType, CreateDto, UpdateDto>,
  CreateDto,
  UpdateDto,
> {
  protected constructor(private readonly baseService: ServiceType) {}

  @Get()
  async findAll() {
    return await this.baseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.baseService.findOne(Number(id));
  }

  @Post()
  async create(@Body() dto: CreateDto) {
    return await this.baseService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDto) {
    return await this.baseService.update(Number(id), dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.baseService.remove(Number(id));
  }
}
