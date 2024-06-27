import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Public } from '../auth/decorators/public.decorator';
import { BaseController } from '../base/base.controller';
import { FilterInterceptor } from '../base/interceptors/filter.interceptor';
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
  @Public()
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.create(createDepartmentDto);
  }

  @UseInterceptors(
    new FilterInterceptor({
      name: ['searchable'],
    }),
  )
  @Get()
  @Public()
  findAll(
    @Req() req: RequestInterface,
  ): Promise<PaginationResponseType<Department>> {
    return this.departmentsService.findAll(req.queryHelper);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Department> {
    return this.departmentsService.findOne(Number(id));
  }

  @Put(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<UpdateResult> {
    return this.departmentsService.update(Number(id), updateDepartmentDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.departmentsService.remove(Number(id));
  }
}
