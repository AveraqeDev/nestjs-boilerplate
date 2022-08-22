import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../entities';
import { AuthCrendentialsDto } from './auth-creds.dto';

export class CreateUserDto extends AuthCrendentialsDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
