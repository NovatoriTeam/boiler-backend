import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/repositories/base.repository';
import { TaskEntity } from '../entities/task.entity';

@Injectable()
export class TaskRepository extends BaseRepository<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {
    super(taskRepository);
  }
}
