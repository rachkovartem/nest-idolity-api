import { ForbiddenException, Injectable } from '@nestjs/common';
import { getGuard } from '../utils/get-guard';

@Injectable()
export class JwtRefreshAuthGuard extends getGuard('jwt-refresh') {
  async canActivate(context) {
    try {
      await super.canActivate(context);
      return true;
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
