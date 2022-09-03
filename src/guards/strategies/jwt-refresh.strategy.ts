import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../modules/auth/auth.service';
import { jwtConfig } from '../../config/jwt-config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService, authService: AuthService) {
    super({
      jwtFromRequest: (request) =>
        authService.cookieExtractor({
          cookieName: jwtConfig.refreshTokenName,
          request,
        }),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      usernameField: 'email',
      signOptions: {
        expiresIn: jwtConfig.refreshAge,
      },
    });
  }

  async validate(payload: any) {
    return { password: payload.sub, email: payload.username };
  }
}
