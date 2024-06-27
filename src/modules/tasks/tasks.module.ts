import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './controllers/task.controller';
import { TaskEntity } from './entities/task.entity';
import { TaskRepository } from './repositories/task.repostiory';
import { TaskService } from './services/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskRepository, TaskService],
  controllers: [TaskController],
})
export class TasksModule {}
