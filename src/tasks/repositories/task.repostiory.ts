import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../base/repositories/base.repository';
import { TaskEntity } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRepository extends BaseRepository<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {
    super(taskRepository);
  }
}
