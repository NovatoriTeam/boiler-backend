import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { Auth } from '../../auth/entities/auth.entity';
import { BaseEntity } from '../../crud/entities/base.entity';
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

  @ApiProperty({ type: Product })
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @ApiProperty({ type: UserRole, isArray: true })
  @OneToMany(() => UserRole, (role) => role.user)
  roles: UserRole[];

  @OneToMany(() => Auth, (auth) => auth.user)
  auths!: Auth[];
}
