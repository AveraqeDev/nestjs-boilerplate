import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from '../user/dtos/user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;
  @Inject(UserService)
  private readonly userService: UserService;

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<{ accessToken: string }> {
    return this.authService.login(req.user as User);
  }

  @Post('register')
  async register(@Body() data: CreateUserDto): Promise<User> {
    return await this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  whoAmI(@Req() req: Request): User {
    return req.user as User;
  }
}
