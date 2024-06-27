import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/repositories/base.repository';
import { Department } from '../entities/department.entity';

@Injectable()
export class DepartmentsRepository extends BaseRepository<Department> {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {
    super(departmentsRepository);
  }
}
