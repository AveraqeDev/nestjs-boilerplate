import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';
import { User } from './entities';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async getAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.repository.findOneBy({ username });
  }

  async findOneByUsernameWithPassword(username: string): Promise<User | null> {
    const user = await this.repository.findOne({
      select: {
        id: true,
        role: true,
        username: true,
        email: true,
        password: true,
      },
      where: { username },
    });
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    if (await this.findOneByUsername(data.username)) {
      throw new BadRequestException('Username already exists!');
    }
    const user: User = new User();

    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
    user.role = data.role;

    return await this.repository.save(user);
  }
}
