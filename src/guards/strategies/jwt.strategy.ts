import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, authService: AuthService) {
    super({
      jwtFromRequest: (request) =>
        authService.cookieExtractor({ cookieName: 'access_token', request }),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      usernameField: 'email',
    });
  }

  async validate(payload: any) {
    return { password: payload.sub, email: payload.username };
  }
}
