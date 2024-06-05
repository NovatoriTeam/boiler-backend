import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: Number })
  @Column()
  name!: string;

  @ApiProperty({ type: Number })
  @Column()
  price!: number;

  @ApiProperty({ type: String })
  @Column()
  shop!: string;

  @ApiProperty({ type: Number })
  @Column()
  userId!: number;

  @ApiProperty({ type: Number, required: false })
  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
