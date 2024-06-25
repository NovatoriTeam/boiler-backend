import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { DepartmentsRepository } from './repositories/departments.repository';

@Injectable()
export class DepartmentsService extends BaseService<
  Department,
  CreateDepartmentDto,
  UpdateDepartmentDto
> {
  constructor(private departmentsRepository: DepartmentsRepository) {
    super(departmentsRepository);
  }
}
