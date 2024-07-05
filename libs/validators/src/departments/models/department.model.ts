import { Expose } from 'class-transformer';
import { BaseModel } from '../../../../../src/modules/crud/models/base.model';

export class DepartmentModel extends BaseModel {
  @Expose()
  name!: string;

  @Expose()
  manager!: string;

  @Expose()
  location!: string;
}
