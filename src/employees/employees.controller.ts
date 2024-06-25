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
import { UpdateResult } from 'typeorm';
import { BaseController } from '../base/base.controller';
import { RequestInterface } from '../base/interfaces/request.interface';
import { PaginationResponseType } from '../base/types/pagination.response.type';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController extends BaseController<
  Employee,
  EmployeesService,
  CreateEmployeeDto,
  UpdateEmployeeDto
> {
  constructor(private readonly employeesService: EmployeesService) {
    super(employeesService);
  }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll(
    @Req() req: RequestInterface,
  ): Promise<PaginationResponseType<Employee>> {
    return this.employeesService.findAll(req.queryHelper);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeesService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<UpdateResult> {
    return this.employeesService.update(Number(id), updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.employeesService.remove(Number(id));
  }
}
