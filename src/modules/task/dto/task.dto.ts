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
    description?: String

    @IsString()
    status?: StatusType

    @IsNumber()
    UserId: number
}

enum StatusType {
    PENDING,
    IN_PROGRESS,
    COMPLETED
}
