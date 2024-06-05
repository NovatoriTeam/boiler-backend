import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TaskRepository } from './repositories/task.repostiory';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskRepository, TaskService],
  controllers: [TaskController]
})
export class TasksModule {}
