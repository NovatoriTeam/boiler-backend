import { Injectable } from '@nestjs/common';
import { CrudService } from '../../crud/services/crud.service';
import { Project } from '../entities/project.entity';
import { ProjectModel } from '../models/project.model';
import { ProjectsRepository } from '../repositories/projects.repository';

@Injectable()
export class ProjectsService extends CrudService<Project, ProjectModel> {
  constructor(private projectsRepository: ProjectsRepository) {
    super(projectsRepository);
  }
}
