import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { BaseController } from '../base/base.controller';
import { RequestInterface } from '../base/interfaces/request.interface';
import { PaginationResponseType } from '../base/types/pagination.response.type';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Controller('departments')
export class DepartmentsController extends BaseController<
  Department,
  DepartmentsService,
  CreateDepartmentDto,
  UpdateDepartmentDto
> {
  constructor(private readonly departmentsService: DepartmentsService) {
    super(departmentsService);
  }

  @Post()
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll(
    @Req() req: RequestInterface,
  ): Promise<PaginationResponseType<Department>> {
    return this.departmentsService.findAll(req.queryHelper);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Department> {
    return this.departmentsService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<UpdateResult> {
    return this.departmentsService.update(Number(id), updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.departmentsService.remove(Number(id));
  }
}
