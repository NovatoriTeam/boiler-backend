import { AuthTypeEnum } from 'novatori/validators';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../crud/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('auth')
@Index(['type', 'identifier'], { unique: true })
export class Auth extends BaseEntity {
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.auths)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ type: 'enum', enum: AuthTypeEnum })
  type!: AuthTypeEnum;

  @Column()
  identifier!: string;

  @Column({ type: 'jsonb', default: {} })
  metadata!: unknown;
}
