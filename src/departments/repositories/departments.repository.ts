import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/repositories/base.repository';
import { Department } from '../entities/department.entity';

@Injectable()
export class DepartmentsRepository extends BaseRepository<Department> {}
