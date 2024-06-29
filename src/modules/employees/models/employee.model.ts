import { Expose, plainToInstance } from 'class-transformer';
import { BaseModel } from '../../crud/models/base.model';
import { Employee } from '../entities/employee.entity';

export class EmployeeModel extends BaseModel<Employee> {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  jobTitle: string;

  @Expose()
  salary: string;

  toEntity(): Employee {
    return plainToInstance(Employee, this);
  }
}
