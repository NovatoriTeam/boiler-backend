import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsRepository } from './repositories/projects.repository';

@Injectable()
export class ProjectsService extends BaseService<
  Project,
  CreateProjectDto,
  UpdateProjectDto
> {
  constructor(private projectsRepository: ProjectsRepository) {
    super(projectsRepository);
  }
}
