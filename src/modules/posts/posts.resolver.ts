import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../utils/decorators/current-user';
import { PostsService } from './posts.service';
import { Post } from './schemas/post.schema';

@Resolver()
export class PostsResolver {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => [Post])
  async createPost(
    @Args('recipientId', { type: () => String }) recipientId: string,
    @CurrentUser() user,
  ) {}
}
