import { Injectable } from '@nestjs/common';
import { ProjectModel } from '../../../boiler-shared/src/validators/projects/models/project.model';
import { CrudService } from '../../crud/services/crud.service';
import { Project } from '../entities/project.entity';
import { ProjectsRepository } from '../repositories/projects.repository';

@Injectable()
export class ProjectsService extends CrudService<Project, ProjectModel> {
  constructor(private projectsRepository: ProjectsRepository) {
    super(projectsRepository);
  }
}
