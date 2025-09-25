import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/security/auth/auth.guard';
import type { UserDecorator } from '../user/types/UserDecorator';
import { User } from '../user/decorators/user.decorator';

@Controller({ path: 'task', version: '1' })
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  create(@User() {id}: UserDecorator, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(id, createTaskDto);
  }

  @UseGuards(AuthGuard)
  @Get('get-all')
  findAll(@User() {id}: UserDecorator) {
    return this.taskService.findAll(+id);
  }

  @UseGuards(AuthGuard)
  @Get('get/:taskId')
  findOne(@User() {id}: UserDecorator, @Param('taskId') taskId: string) {
    return this.taskService.findOne(+id, +taskId);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:taskId')
  update(@User() {id}: UserDecorator, @Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, +taskId, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
