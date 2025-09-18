import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    saltOrRounds: number = 12

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        // private userService: UserService,
    ){}

    async signIn(authDto: AuthDto) {
        const { email, password } = authDto
        if (password === undefined) return "password not exists"
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        })
        if (!user) return "User not exists"
        const checkedPassword = await bcrypt.compare(password, user?.password)
        if (!checkedPassword) return "password incorrect"
        try {
            const payload = { id: user.id }
            const token = await this.jwtService.signAsync(payload)
            return token
        } catch (error) {
            return error
        }
    }

    async encryptPassword(password: string){
        const salt = await bcrypt.genSalt(this.saltOrRounds)
        const passHash = await bcrypt.hash(password, salt)
        return passHash
    }

}
