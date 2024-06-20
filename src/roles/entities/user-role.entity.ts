import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { RoleEnum } from '../enums/role.enum';

@Entity('user_role')
export class UserRole extends BaseEntity {
  @Column({ type: 'enum', enum: RoleEnum })
  role!: RoleEnum;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn({ name: 'userId' })
  user!: User;
}
