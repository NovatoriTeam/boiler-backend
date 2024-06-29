import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRepository } from '../../crud/repositories/crud.repository';
import { Project } from '../entities/project.entity';
import { ProjectModel } from '../models/project.model';

@Injectable()
export class ProjectsRepository extends CrudRepository<Project, ProjectModel> {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {
    super(projectsRepository);
  }
}
