import { DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @DeleteDateColumn()
  deletedAt!: Date;
}
