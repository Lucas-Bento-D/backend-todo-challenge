import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/security/auth/auth.guard';
import { User } from './decorators/user.decorator';
import type { UserDecorator } from './types/UserDecorator';


@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@User() {id}: UserDecorator) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@User() {id}: UserDecorator, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@User() {id}: UserDecorator) {
    return this.userService.remove(+id);
  }

}
