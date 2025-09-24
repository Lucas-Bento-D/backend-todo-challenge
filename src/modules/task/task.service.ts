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

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
