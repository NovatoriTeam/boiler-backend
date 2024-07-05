import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectModel } from 'novatori/validators/projects/models/project.model';
import { Repository } from 'typeorm';
import { CrudRepository } from '../../crud/repositories/crud.repository';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectsRepository extends CrudRepository<Project, ProjectModel> {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {
    super(projectsRepository, ProjectModel);
  }
}
