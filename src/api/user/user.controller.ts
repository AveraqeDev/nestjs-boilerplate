import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get()
  async getAll(): Promise<User[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.service.findOneById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return await this.service.create(body);
  }
}
