import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsController } from './controllers/departments.controller';
import { Department } from './entities/department.entity';
import { DepartmentsRepository } from './repositories/departments.repository';
import { DepartmentsService } from './services/departments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentsRepository],
})
export class DepartmentsModule {}
