import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../crud/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('products')
export class Product extends BaseEntity {
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
}
