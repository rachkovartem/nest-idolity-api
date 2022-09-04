import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserOmitPassword } from './schemas/users.schema';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../../utils/decorators/current-user';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserOmitPassword)
  async test(
    @Args('email', { type: () => String }) email: string,
    @CurrentUser() user,
  ) {}
}
