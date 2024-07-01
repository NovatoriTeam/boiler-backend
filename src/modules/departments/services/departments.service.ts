import { Injectable } from '@nestjs/common';
import { CrudService } from '../../crud/services/crud.service';
import { Department } from '../entities/department.entity';
import { DepartmentModel } from '../models/department.model';
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
