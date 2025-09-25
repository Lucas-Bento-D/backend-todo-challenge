import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthService } from 'src/security/auth/auth.service';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService,
    private authService: AuthService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email, confirmEmail, password, name } = createUserDto

    const passHash = await this.authService.encryptPassword(password)

    if (confirmEmail !== email) {
      return "The emails aren`t equals"
    }
    const user = await this.prisma.user.create({
      data: {
        email, 
        password: passHash, 
        name
      }
    })
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })
    if (!user) return "User not exists"
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, confirmEmail, password, name } = updateUserDto
    if (confirmEmail !== email) return "The emails aren`t equals"

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })
    if (!user) return "User not exists"

    const updateUser = {
      email, password, name, updatedAt: new Date()
    }
    const updatedUser = this.prisma.user.update({
      where: {
        id
      },
      data: { ...user, ...updateUser }
    })
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
