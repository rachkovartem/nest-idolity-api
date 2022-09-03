import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

export const getGuard = (type: string) =>
  class LocalAuthGuard extends AuthGuard(type) {
    getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      const gqlReq = ctx.getContext().req;
      if (gqlReq) {
        gqlReq.body = ctx.getArgs();
        return gqlReq;
      }
      return context.switchToHttp().getRequest();
    }
  };
