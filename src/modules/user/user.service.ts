import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  saltOrRounds: number = 12

  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const { email, confirmEmail, password, name } = createUserDto
    const salt = await bcrypt.genSalt(this.saltOrRounds)
    const passHash = await bcrypt.hash(password, salt)

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
      email, password, name
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

  async login(LoginUser: LoginUserDto){
    const {email, password} = LoginUser
    if(password === undefined) return "nao tem senha"
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })
    if (!user) return "User not exists"
    const checkedPassword = await bcrypt.compare(password, user?.password)
    if(!checkedPassword) return "senha errada"
    try {
      const payload = { id: user.id }
      const token = await this.jwtService.signAsync(payload)
      return token
    } catch (error) {
      return error
    }
  }
}
