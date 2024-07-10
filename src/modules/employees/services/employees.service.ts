import { Injectable } from '@nestjs/common';
import { EmployeeModel } from '../../../boiler-shared/src/validators/employees/models/employee.model';
import { CrudService } from '../../crud/services/crud.service';
import { Employee } from '../entities/employee.entity';
import { EmployeesRepository } from '../repositories/employees.repository';

@Injectable()
export class EmployeesService extends CrudService<Employee, EmployeeModel> {
  constructor(private employeesRepository: EmployeesRepository) {
    super(employeesRepository);
  }
}
