import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { refreshTokenConsts } from '../consts/refreshToken/refreshToken';

@Entity('refresh')
@Index(['refreshToken', 'userId'], { unique: true })
export class Refresh {
  @PrimaryColumn()
  refreshToken!: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'datetime',
    default: refreshTokenConsts.expiration,
  })
  expirationDate: Date;
}
