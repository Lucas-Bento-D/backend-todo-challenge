import { IsNotEmpty, IsString } from "class-validator";
import { Timestamp } from "src/dto/timestamp.dto";

export class User extends Timestamp {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    name: string

}