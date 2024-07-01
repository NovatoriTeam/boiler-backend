import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './controllers/employees.controller';
import { Employee } from './entities/employee.entity';
import { EmployeesRepository } from './repositories/employees.repository';
import { EmployeesService } from './services/employees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesRepository],
})
export class EmployeesModule {}
