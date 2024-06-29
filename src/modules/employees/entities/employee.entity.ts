import { plainToInstance } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../crud/entities/base.entity';
import { Department } from '../../departments/entities/department.entity';
import { EmployeeModel } from '../models/employee.model';

@Entity()
export class Employee extends BaseEntity<EmployeeModel> {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  phoneNumber!: string;

  @Column({ type: 'timestamp' })
  hireDate!: Date;

  @Column()
  jobTitle!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salary!: number;

  @Column()
  departmentId!: number;

  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'departmentId' })
  department!: Department;

  toModel(): EmployeeModel {
    return plainToInstance(EmployeeModel, this);
  }
}
