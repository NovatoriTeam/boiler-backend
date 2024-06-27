import { Injectable } from '@nestjs/common';
import { BaseService } from '../../base/services/base.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repostiory';

@Injectable()
export class TaskService extends BaseService<
  TaskEntity,
  CreateTaskDto,
  UpdateTaskDto
> {
  constructor(private taskRepository: TaskRepository) {
    super(taskRepository);
  }
}
