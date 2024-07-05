import { Expose, plainToInstance } from 'class-transformer';
import { BaseModel } from '../../../../../src/modules/crud/models/base.model';
import { Project } from '../../../../../src/modules/projects/entities/project.entity';

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
