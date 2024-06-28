import { plainToInstance } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../crud/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { UserRoleModel } from '../models/role.model';
import { RoleEnum } from '../types/enums/role.enum';

@Entity('user_role')
export class UserRole extends BaseEntity<UserRoleModel> {
  @Column({ type: 'enum', enum: RoleEnum })
  name!: RoleEnum;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn({ name: 'userId' })
  user!: User;

  toModel(): UserRoleModel {
    return plainToInstance(UserRoleModel, this);
  }
}
