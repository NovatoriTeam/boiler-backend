import { Expose, plainToInstance } from 'class-transformer';
import { Project } from '../../../../../src/modules/projects/entities/project.entity';
import { BaseModel } from '../../base/base.model';

export class ProjectModel extends BaseModel {
  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  budget!: string;

  @Expose()
  status!: string;

  toEntity(): Project {
    return plainToInstance(Project, this);
  }
}
