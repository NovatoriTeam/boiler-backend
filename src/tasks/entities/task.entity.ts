import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';

@Entity()
export class TaskEntity extends BaseEntity {
  @Column()
  name: string;
}
