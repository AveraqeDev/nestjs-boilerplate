import {
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../entities';

export class UserDto {
  @IsNumber()
  id: number;

  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsAlphanumeric()
  username: string;

  @IsEmail()
  email: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsOptional()
  @IsDateString()
  deletedAt: Date;
}
