import { IsString, IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class Timestamp {
    @IsString()
    @IsNotEmpty()
    createdAt: string;

    @IsString()
    @IsNotEmpty()
    updatedAt: string;

    @IsString()
    deletedAt?: string;
}