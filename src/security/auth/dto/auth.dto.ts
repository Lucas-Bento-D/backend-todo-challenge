import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/modules/user/dto/user.dto';

export class AuthDto extends PartialType(User) {}
