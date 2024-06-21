import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { RolesRepository } from './repositories/roles.repository';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [RolesService, RolesRepository],
})
export class RolesModule {}
