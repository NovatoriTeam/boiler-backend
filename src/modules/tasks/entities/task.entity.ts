import { plainToInstance } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../crud/entities/base.entity';
import { TaskModel } from '../models/task.model';

@Entity()
export class TaskEntity extends BaseEntity<TaskModel> {
  @Column()
  name!: string;

  @Column()
  description!: string;

  toModel(): TaskModel {
    return plainToInstance(TaskModel, this);
  }
}
