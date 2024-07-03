import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CrudController } from '../../crud/controllers/crud.controller';
import { RequestInterface } from '../../crud/types/interfaces/request.interface';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { TaskModel } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Controller('tasks')
export class TaskController extends CrudController<TaskEntity, TaskModel> {
  constructor(private taskService: TaskService) {
    super(taskService);
  }

  @Get()
  async findAllController(
    @Req() req: RequestInterface,
  ): Promise<[TaskModel[], number]> {
    return await super.findAll(req);
  }

  @Post()
  async createController(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskModel> {
    return await super.create(createTaskDto);
  }

  @Get(':id')
  async findOneController(@Param('id') id: string): Promise<TaskModel> {
    return await super.findOne(id);
  }

  @Put(':id')
  async updateController(
    @Param('id') id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskModel> {
    return await super.update(id, updateTaskDto);
  }

  @Delete(':id')
  async removeController(@Param('id') id: string): Promise<TaskModel> {
    return await super.remove(id);
  }
}
