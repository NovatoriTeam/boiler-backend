import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/repositories/base.repository';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeesRepository extends BaseRepository<Employee> {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {
    super(employeesRepository);
  }
}
