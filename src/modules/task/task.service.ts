import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { StatusType } from 'generated/prisma';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService){}
  
  async create(userId, createTaskDto: CreateTaskDto) {

    const {title, description, status} = createTaskDto

    const task = await this.prisma.task.create({
      data: {
        title, 
        description: description || "",
        status: status || StatusType.PENDING,
        userId,
      }
    })
    
    return task;
  }

  async findAll(userId: number) {
    return await this.prisma.task.findMany({
      where: {
        userId
      }
    });
  }

  async findOne(userId: number, taskId: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
        userId
      }
    })
    return task;
  }

  async update(userId: number, id: number, updateTaskDto: UpdateTaskDto) {
    const {title, description, status} = updateTaskDto
    const updateTask = {title, description, status, updatedAt: new Date()}
    const task = await this.prisma.task.findUnique({
      where: {
        id,
        userId
      }
    }) 
    const updatedTask = await this.prisma.task.update({
      where: {
        id,
      },
      data: {...task, ...updateTask}
    })
    return updatedTask;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
