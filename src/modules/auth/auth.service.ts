import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { parseCookie } from '../../utils/parse-cookie';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserWithPassword(email);
    const { password: dbPassword, ...result } = user;
    const isValid = await bcrypt.compare(password, dbPassword);

    if (user && isValid) {
      return result;
    }
    return null;
  }

  login(user) {
    const payload = { username: user.email, sub: user.password };
    return this.jwtService.sign(payload);
  }

  cookieExtractor({ cookieName, request }) {
    const cookies = parseCookie(request.headers.cookie);
    return cookies[cookieName];
  }
}
