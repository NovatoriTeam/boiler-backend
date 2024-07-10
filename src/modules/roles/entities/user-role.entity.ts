import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RoleEnum } from '../../../boiler-shared/src/validators/roles/enums/role.enum';
import { BaseEntity } from '../../crud/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('user_role')
export class UserRole extends BaseEntity {
  @Column({ type: 'enum', enum: RoleEnum })
  name!: RoleEnum;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn({ name: 'userId' })
  user!: User;
}
