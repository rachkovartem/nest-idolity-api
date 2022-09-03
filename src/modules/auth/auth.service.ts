import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { parseCookie } from '../../utils/parse-cookie';
import { jwtConfig } from '../../config/jwt-config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserWithPassword(email);
    const { password: dbPassword, ...result } = user;
    const isValid = await bcrypt.compare(password, dbPassword);

    if (user && isValid) {
      return result;
    }
    return null;
  }

  async login({ email, password }) {
    const payload = { username: email, sub: password };
    const accessToken = this.getAccessToken({ email, password });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: jwtConfig.refreshAge,
    });
    const fullUser = await this.usersService.getUserWithPassword(email);
    return { accessToken, refreshToken, fullUser };
  }

  getAccessToken(payload) {
    return this.jwtService.sign(payload, {
      expiresIn: jwtConfig.accessAge,
    });
  }

  cookieExtractor({ cookieName, request }) {
    const cookies = parseCookie(request.headers.cookie);
    return cookies[cookieName];
  }
}
