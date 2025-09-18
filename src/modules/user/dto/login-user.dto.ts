import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.dto';

export class LoginUserDto extends PartialType(User) {}
