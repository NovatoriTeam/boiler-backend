import { Controller, Get, Req } from '@nestjs/common';
import { CrudController } from '../../crud/controllers/crud.controller';
import { TaskEntity } from '../entities/task.entity';
import { TaskService } from '../services/task.service';

@Controller('tasks')
export class TaskController extends CrudController<TaskEntity> {
  constructor(private taskService: TaskService) {
    super(taskService);
  }

  @Get()
  async findAll(@Req() req): Promise<[TaskEntity[], number]> {
    return await this.taskService.findAll(req.queryApplier);
  }
}
