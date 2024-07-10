import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentModel } from '../../../boiler-shared/src/validators/departments/models/department.model';
import { CrudRepository } from '../../crud/repositories/crud.repository';
import { Department } from '../entities/department.entity';

@Injectable()
export class DepartmentsRepository extends CrudRepository<
  Department,
  DepartmentModel
> {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {
    super(departmentsRepository, DepartmentModel);
  }
}
