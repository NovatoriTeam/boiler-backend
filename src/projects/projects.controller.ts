import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Public } from '../auth/decorators/public.decorator';
import { BaseController } from '../base/base.controller';
import { FilterInterceptor } from '../base/interceptors/filter.interceptor';
import { RequestInterface } from '../base/interfaces/request.interface';
import { PaginationResponseType } from '../base/types/pagination.response.type';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { projectsFilterInterceptorParameters } from './utils/projects-filter-interceptor.parameters';

@Controller('projects')
export class ProjectsController extends BaseController<
  Project,
  ProjectsService,
  CreateProjectDto,
  UpdateProjectDto
> {
  constructor(private readonly projectsService: ProjectsService) {
    super(projectsService);
  }

  @Post()
  @Public()
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @UseInterceptors(new FilterInterceptor(projectsFilterInterceptorParameters))
  @Public()
  @Get()
  findAll(
    @Req() req: RequestInterface,
  ): Promise<PaginationResponseType<Project>> {
    return this.projectsService.findAll(req.queryHelper);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(Number(id));
  }

  @Put(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateResult> {
    return this.projectsService.update(Number(id), updateProjectDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.projectsService.remove(Number(id));
  }
}
