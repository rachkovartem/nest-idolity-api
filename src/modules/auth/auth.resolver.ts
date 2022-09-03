import {
  Args,
  Context,
  Mutation,
  OmitType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { LoginOutput, User } from '../users/schemas/users.schema';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { jwtConfig } from '../../config/jwt-config';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../utils/decorators/current-user';
import { JwtRefreshAuthGuard } from '../../guards/jwt-refresh-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authServise: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Query(() => LoginOutput)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
    @Context() ctx,
  ) {
    const { accessToken, refreshToken, fullUser } =
      await this.authServise.login(ctx.req.body);
    ctx.res.cookie(jwtConfig.accessTokenName, accessToken, {
      maxAge: jwtConfig.accessAge,
      httpOnly: jwtConfig.httpOnly,
    });
    ctx.res.cookie(jwtConfig.refreshTokenName, refreshToken, {
      maxAge: jwtConfig.refreshAge,
      httpOnly: jwtConfig.httpOnly,
    });
    return fullUser;
  }

  @Mutation(() => User)
  async createUser(
    @Args('name', { type: () => String }) name: string,
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return await this.usersService.create({
      name,
      email,
      password,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async profile(@CurrentUser() user) {
    return await this.usersService.getUser(user.email);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Query(() => String)
  async refresh(@Context() ctx, @CurrentUser() user) {
    const accessToken = this.authServise.getAccessToken(user);
    ctx.res.cookie(jwtConfig.accessTokenName, accessToken, {
      maxAge: jwtConfig.accessAge,
      httpOnly: jwtConfig.httpOnly,
    });
    return 'Success';
  }
}
