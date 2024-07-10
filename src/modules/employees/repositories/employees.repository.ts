import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeModel } from '../../../boiler-shared/src/validators/employees/models/employee.model';
import { CrudRepository } from '../../crud/repositories/crud.repository';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeesRepository extends CrudRepository<
  Employee,
  EmployeeModel
> {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {
    super(employeesRepository, EmployeeModel);
  }
}
