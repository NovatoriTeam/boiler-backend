import { Injectable } from '@nestjs/common';
import { CrudService } from '../../crud/services/crud.service';
import { TaskEntity } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repostiory';

@Injectable()
export class TaskService extends CrudService<TaskEntity> {
  constructor(private taskRepository: TaskRepository) {
    super(taskRepository);
  }
}
