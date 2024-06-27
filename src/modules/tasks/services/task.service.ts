import { Injectable } from '@nestjs/common';
import { BaseService } from '../../base/services/base.service';
import { TaskEntity } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repostiory';

@Injectable()
export class TaskService extends BaseService<TaskEntity> {
  constructor(private taskRepository: TaskRepository) {
    super(taskRepository);
  }
}
