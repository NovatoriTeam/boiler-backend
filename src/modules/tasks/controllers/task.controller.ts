import { Controller, Get, Req } from '@nestjs/common';
import { CrudController } from '../../crud/controllers/crud.controller';
import { TaskEntity } from '../entities/task.entity';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Controller('tasks')
export class TaskController extends CrudController<TaskEntity, TaskModel> {
  constructor(private taskService: TaskService) {
    super(taskService);
  }

  @Get()
  async findAll(@Req() req): Promise<[TaskModel[], number]> {
    return await this.taskService.findAll(req);
  }
}
