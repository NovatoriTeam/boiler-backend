import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Column, Entity, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '../../base/entities/base.entity';
import { Product } from '../../products/entities/product.entity';
import { UserRole } from '../../roles/entities/user-role.entity';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ type: String })
  @Column()
  firstName: string;

  @ApiProperty({ type: Number, nullable: true })
  @Column()
  lastName: string;

  @ApiProperty({ type: Number })
  @Column({ unique: true })
  email!: string;

  @Column({
    select: false,
    default: bcrypt.hashSync(uuidv4() as string, bcrypt.genSaltSync(10)),
  })
  password!: string;

  @ApiProperty({ type: Product })
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @ApiProperty({ type: UserRole, isArray: true })
  @OneToMany(() => UserRole, (role) => role.user)
  roles: UserRole[];
}
