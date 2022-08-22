import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';

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
    return await this.repository.findOne({
      select: { password: true },
      where: { username },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
    user.role = data.role;

    return this.repository.save(user);
  }
}
