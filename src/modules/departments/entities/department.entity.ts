import { plainToInstance } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../crud/entities/base.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { DepartmentModel } from '../models/department.model';

@Entity()
export class Department extends BaseEntity<DepartmentModel> {
  @Column()
  name: string;

  @Column()
  manager: string;

  @Column()
  location: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];

  toModel(): DepartmentModel {
    return plainToInstance(DepartmentModel, this);
  }
}
