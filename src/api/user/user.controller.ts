import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserDto } from './dtos';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<UserDto[]> {
    return await this.service.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const user = await this.service.findOneById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
