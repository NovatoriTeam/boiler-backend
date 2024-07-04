import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateDepartmentDto, UpdateDepartmentDto } from 'novatori/validators';
import { Public } from '../../auth/decorators/public.decorator';
import { CrudController } from '../../crud/controllers/crud.controller';
import { CrudFilter } from '../../crud/decorators/crud-filter.decorator';
import { RequestInterface } from '../../crud/types/interfaces/request.interface';
import { Department } from '../entities/department.entity';
import { DepartmentModel } from '../models/department.model';
import { DepartmentsService } from '../services/departments.service';

@Controller('departments')
export class DepartmentsController extends CrudController<
  Department,
  DepartmentModel
> {
  constructor(private readonly departmentsService: DepartmentsService) {
    super(departmentsService);
  }

  @Post()
  @Public()
  createController(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentModel> {
    return this.departmentsService.$_create(createDepartmentDto);
  }

  @CrudFilter({
    name: ['searchable', 'sortable'],
    manager: ['searchable', 'sortable'],
    location: ['searchable', 'sortable'],
  })
  @Get()
  @Public()
  findAllController(
    @Req() req: RequestInterface,
  ): Promise<[DepartmentModel[], number]> {
    return this.departmentsService.$_findAll(req.queryHelper);
  }

  @Get(':id')
  @Public()
  findOneController(@Param('id') id: string): Promise<DepartmentModel> {
    return this.departmentsService.$_findOne(Number(id));
  }

  @Put(':id')
  @Public()
  updateController(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<DepartmentModel> {
    return this.departmentsService.$_update(Number(id), updateDepartmentDto);
  }

  @Delete(':id')
  @Public()
  removeController(@Param('id') id: string): Promise<DepartmentModel> {
    return this.departmentsService.$_remove(Number(id));
  }
}
