import { Expose } from 'class-transformer';
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
  salary: number;
}
