import { Injectable } from '@nestjs/common';
import { CrudService } from '../../crud/services/crud.service';
import { Employee } from '../entities/employee.entity';
import { EmployeeModel } from '../models/employee.model';
import { EmployeesRepository } from '../repositories/employees.repository';

@Injectable()
export class EmployeesService extends CrudService<Employee, EmployeeModel> {
  constructor(private employeesRepository: EmployeesRepository) {
    super(employeesRepository);
  }
}
