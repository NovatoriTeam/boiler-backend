import { plainToInstance } from 'class-transformer';
import { BaseModel } from '../../../boiler-shared/src/validators/base/base.model';
import { TaskEntity } from '../entities/task.entity';

export class TaskModel extends BaseModel {
  toEntity(): TaskEntity {
    return plainToInstance(TaskEntity, this);
  }
}
