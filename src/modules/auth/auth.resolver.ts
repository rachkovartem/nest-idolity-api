import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/users.schema';
import { UseGuards, Response, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { jwtConfig } from '../../config/jwt-config';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authServise: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Query(() => User)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
    @Context() ctx,
  ) {
    const user = await this.usersService.getUser(ctx.req.body.email);
    const accessToken = this.authServise.login(ctx.req.body);
    ctx.res.cookie('access_token', accessToken, {
      maxAge: jwtConfig.accessAge,
      httpOnly: true,
    });
    return user;
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
  async me(@Context() ctx) {
    console.log(ctx.req.body.email);
    const user = await this.usersService.getUser(ctx.req.body.email);
  }
}
