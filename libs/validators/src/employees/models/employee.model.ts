import { Expose, plainToInstance } from 'class-transformer';
import { BaseModel } from '../../../../../src/modules/crud/models/base.model';
import { Employee } from '../../../../../src/modules/employees/entities/employee.entity';

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
