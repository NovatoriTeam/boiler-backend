import { Injectable } from '@nestjs/common';
import { DepartmentModel } from 'novatori/validators';
import { CrudService } from '../../crud/services/crud.service';
import { Department } from '../entities/department.entity';
import { DepartmentsRepository } from '../repositories/departments.repository';

@Injectable()
export class DepartmentsService extends CrudService<
  Department,
  DepartmentModel
> {
  constructor(private departmentsRepository: DepartmentsRepository) {
    super(departmentsRepository);
  }
}
