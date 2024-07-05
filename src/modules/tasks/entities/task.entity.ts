import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../crud/entities/base.entity';

@Entity()
export class TaskEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;
}
