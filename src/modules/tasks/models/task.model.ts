import { plainToInstance } from 'class-transformer';
import { BaseModel } from 'novatori/validators';
import { TaskEntity } from '../entities/task.entity';

export class TaskModel extends BaseModel {
  toEntity(): TaskEntity {
    return plainToInstance(TaskEntity, this);
  }
}
