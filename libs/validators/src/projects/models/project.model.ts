import { Expose } from 'class-transformer';
import { BaseModel } from '../../base/base.model';

export class ProjectModel extends BaseModel {
  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  budget!: number;

  @Expose()
  status!: string;
}
