import { BaseEntity } from '../../base/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class TaskEntity extends BaseEntity {
  @Column()
  name: string;
}
