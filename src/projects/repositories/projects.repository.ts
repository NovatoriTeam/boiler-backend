import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/repositories/base.repository';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectsRepository extends BaseRepository<Project> {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {
    super(projectsRepository);
  }
}
