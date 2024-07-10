import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CreateProjectDto } from '../../../boiler-shared/src/validators/projects/create-project.dto';
import { ProjectModel } from '../../../boiler-shared/src/validators/projects/models/project.model';
import { UpdateProjectDto } from '../../../boiler-shared/src/validators/projects/update-project.dto';
import { Public } from '../../auth/decorators/public.decorator';
import { CrudController } from '../../crud/controllers/crud.controller';
import { CrudFilter } from '../../crud/decorators/crud-filter.decorator';
import { RequestInterface } from '../../crud/types/interfaces/request.interface';
import { Project } from '../entities/project.entity';
import { ProjectsService } from '../services/projects.service';

@Controller('projects')
export class ProjectsController extends CrudController<Project, ProjectModel> {
  constructor(private readonly projectsService: ProjectsService) {
    super(projectsService);
  }

  @Public()
  @Post()
  async createController(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectModel> {
    return await super.create(createProjectDto);
  }

  @CrudFilter({
    name: ['sortable', 'searchable'],
    description: ['sortable', 'searchable'],
    budget: ['sortable'],
    status: ['sortable', 'searchable'],
  })
  @Public()
  @Get()
  async findAllController(
    @Req() req: RequestInterface,
  ): Promise<[ProjectModel[], number]> {
    return await super.findAll(req);
  }

  @Public()
  @Get(':id')
  async findOneController(@Param('id') id: string): Promise<ProjectModel> {
    return await super.findOne(id);
  }

  @Public()
  @Put(':id')
  async updateController(
    @Param('id') id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectModel> {
    return await super.update(id, updateProjectDto);
  }

  @Public()
  @Delete(':id')
  async removeController(@Param('id') id: string): Promise<ProjectModel> {
    return await super.remove(id);
  }
}
