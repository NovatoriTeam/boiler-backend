import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connectionOptions } from './db/orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { CompilerModule } from './modules/compiler/compiler.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { ProductsModule } from './modules/products/products.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { RolesModule } from './modules/roles/roles.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    UsersModule,
    AuthModule,
    ProductsModule,
    RolesModule,
    TasksModule,
    CompilerModule,
    ProjectsModule,
    DepartmentsModule,
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
