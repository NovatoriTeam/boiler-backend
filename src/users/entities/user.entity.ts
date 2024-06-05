import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Role } from '../../roles/entities/roles.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: String })
  @Column()
  firstName: string;

  @ApiProperty({ type: Number })
  @Column()
  lastName: string;

  @ApiProperty({ type: Number })
  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @ApiProperty({ type: Product })
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @ApiProperty({ type: Role })
  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];
}
