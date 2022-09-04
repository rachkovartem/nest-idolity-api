import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../modules/auth/auth.service';
import { jwtConfig } from '../../config/jwt-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, authService: AuthService) {
    super({
      jwtFromRequest: (request) =>
        authService.cookieExtractor({
          cookieName: jwtConfig.accessTokenName,
          request,
        }),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      usernameField: 'email',
      signOptions: {
        expiresIn: jwtConfig.accessAge,
      },
    });
  }

  async validate({ password, email }) {
    return { password, email };
  }
}
