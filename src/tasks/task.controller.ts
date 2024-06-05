import { BaseController } from '../base/base.controller';
import { TaskEntity } from './entities/task.entity';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { FilterInterceptor } from '../base/interceptors/filter.interceptor';

@Controller('tasks')
export class TaskController extends BaseController<
  TaskEntity,
  TaskService,
  CreateTaskDto,
  UpdateTaskDto
> {
  constructor(private taskService: TaskService) {
    super(taskService);
  }

  @Get()
  async findAll(@Req() req) {
    return await this.taskService.findAll(req.queryApplier);
  }
}
