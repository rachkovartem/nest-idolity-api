import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../modules/auth/auth.service';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const getGuard = (type: string) =>
  class Guard extends AuthGuard(type) {
    getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      const gqlReq = ctx.getContext().req;

      if (gqlReq) {
        if (type === 'local') {
          gqlReq.body = ctx.getArgs();
        } else {
          gqlReq.user = ctx.getArgs();
        }
        return gqlReq;
      }
      return context.switchToHttp().getRequest();
    }
  };
