import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import { User } from '../user/entities';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneByUsernameWithPassword(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload: JwtPayload = {
      username: user.username,
      role: user.role,
      email: user.email,
      sub: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
