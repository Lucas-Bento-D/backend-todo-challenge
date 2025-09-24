import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Timestamp } from "src/dto/timestamp.dto"

export class TaskDto extends Timestamp {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    title: string

    @IsString()
    description?: string

    @IsString()
    status?: StatusType

    @IsNotEmpty()
    @IsNumber()
    userId: number
}

export enum StatusType {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}
