import { Expose, plainToInstance } from 'class-transformer';
import { ProjectInterface } from 'novatori/validators/projects/interfaces/project.interface';
import { BaseModel } from '../../crud/models/base.model';
import { Project } from '../entities/project.entity';

export class ProjectModel
  extends BaseModel<Project>
  implements ProjectInterface
{
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
