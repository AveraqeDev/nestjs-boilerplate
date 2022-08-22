import { Role } from 'src/api/user/entities';

export interface JwtPayload {
  username: string;
  email: string;
  role: Role;
  sub: number;
}
