import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'boiler-shareds';
import { DeleteResult } from 'typeorm';
import { UserModel } from '../../../boiler-shared/src/validators/user/user.model';
import { Public } from '../../auth/decorators/public.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return await this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.usersService.remove(Number(id));
  }
}
