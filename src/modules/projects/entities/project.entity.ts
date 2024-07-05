import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../crud/entities/base.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Project extends BaseEntity {
  @Column()
  name!: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  budget: number;

  @Column()
  status: string;

  @ManyToMany(() => Employee)
  @JoinTable()
  employees: Employee[];
}
