import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { EmployeesRepository } from './repositories/employees.repository';

@Injectable()
export class EmployeesService extends BaseService<
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto
> {
  constructor(private employeesRepository: EmployeesRepository) {
    super(employeesRepository);
  }
}
