import { Expose, plainToInstance } from 'class-transformer';
import { Employee } from '../../../../../src/modules/employees/entities/employee.entity';
import { BaseModel } from '../../base/base.model';

export class EmployeeModel extends BaseModel {
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
