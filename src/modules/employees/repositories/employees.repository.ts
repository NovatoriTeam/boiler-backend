import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRepository } from '../../crud/repositories/crud.repository';
import { Employee } from '../entities/employee.entity';
import { EmployeeModel } from '../models/employee.model';

@Injectable()
export class EmployeesRepository extends CrudRepository<
  Employee,
  EmployeeModel
> {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {
    super(employeesRepository);
  }
}
