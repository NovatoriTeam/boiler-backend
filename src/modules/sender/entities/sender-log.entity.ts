import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SenderTypeEnum } from '../enums/sender-type.enum';
import { SmsStatusEnum } from '../enums/sms-status.enum';

@Entity('sender_logs')
export class SenderLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  content!: string;

  @Column()
  phone!: string;

  @Column({ type: 'enum', enum: SmsStatusEnum, nullable: true })
  status!: SmsStatusEnum;

  @Column({ type: 'enum', enum: SenderTypeEnum })
  sender!: SenderTypeEnum;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
