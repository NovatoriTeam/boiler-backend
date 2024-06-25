import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { BaseController } from '../base/base.controller';
import { RequestInterface } from '../base/interfaces/request.interface';
import { PaginationResponseType } from '../base/types/pagination.response.type';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

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
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(
    @Req() req: RequestInterface,
  ): Promise<PaginationResponseType<Project>> {
    return this.projectsService.findAll(req.queryHelper);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateResult> {
    return this.projectsService.update(Number(id), updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.projectsService.remove(Number(id));
  }
}
