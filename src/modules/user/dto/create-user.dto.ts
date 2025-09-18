import { IsNotEmpty, IsString } from "class-validator"
import { User } from "./user.dto"

export class CreateUserDto extends User{
    @IsNotEmpty()
    @IsString()
    confirmEmail: string
}

