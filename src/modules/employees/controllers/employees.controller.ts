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
import { CreateEmployeeDto, UpdateEmployeeDto } from 'novatori/validators';
import { EmployeeModel } from 'novatori/validators/employees/models/employee.model';
import { Public } from '../../auth/decorators/public.decorator';
import { CrudController } from '../../crud/controllers/crud.controller';
import { RequestInterface } from '../../crud/types/interfaces/request.interface';
import { Employee } from '../entities/employee.entity';
import { EmployeesService } from '../services/employees.service';

@Controller('employees')
export class EmployeesController extends CrudController<
  Employee,
  EmployeeModel
> {
  constructor(private readonly employeesService: EmployeesService) {
    super(employeesService);
  }

  @Public()
  @Post()
  async createController(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeModel> {
    return await this.employeesService.$_create(createEmployeeDto);
  }

  @Public()
  @Get()
  async findAllController(
    @Req() req: RequestInterface,
  ): Promise<[EmployeeModel[], number]> {
    return await this.employeesService.$_findAll(req.queryHelper);
  }

  @Public()
  @Get(':id')
  async findOneController(@Param('id') id: string): Promise<EmployeeModel> {
    return await this.employeesService.$_findOne(Number(id));
  }

  @Public()
  @Put(':id')
  async updateController(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeModel> {
    return await this.employeesService.$_update(Number(id), updateEmployeeDto);
  }

  @Public()
  @Delete(':id')
  async removeController(@Param('id') id: string): Promise<EmployeeModel> {
    return await this.employeesService.$_remove(Number(id));
  }
}
