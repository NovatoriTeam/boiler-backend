import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../crud/entities/base.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Department extends BaseEntity {
  @Column()
  name: string;

  @Column()
  manager: string;

  @Column()
  location: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
