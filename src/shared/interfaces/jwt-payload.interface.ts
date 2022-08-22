import { Role } from 'src/api/user/entities/role.enum';

export interface JwtPayload {
  username: string;
  email: string;
  role: Role;
  sub: number;
}
