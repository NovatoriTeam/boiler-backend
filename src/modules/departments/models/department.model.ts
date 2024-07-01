import { Expose, plainToInstance } from 'class-transformer';
import { BaseModel } from '../../crud/models/base.model';
import { Department } from '../entities/department.entity';

export class DepartmentModel extends BaseModel<Department> {
  @Expose()
  name!: string;

  @Expose()
  manager!: string;

  @Expose()
  location!: string;

  toEntity(): Department {
    return plainToInstance(Department, this);
  }
}
