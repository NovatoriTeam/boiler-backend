import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRepository } from '../../crud/repositories/crud.repository';
import { TaskEntity } from '../entities/task.entity';
import { TaskModel } from '../models/task.model';

@Injectable()
export class TaskRepository extends CrudRepository<TaskEntity, TaskModel> {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {
    super(taskRepository);
  }
}
