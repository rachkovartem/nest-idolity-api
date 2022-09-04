import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../utils/decorators/current-user';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './schemas/subscription.schema';

@Resolver()
export class SubscriptionsResolver {
  constructor(private subscriptionService: SubscriptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Subscription)
  async createSubscription(
    @Args('recipientEmail', { type: () => String }) recipientEmail: string,
    @CurrentUser() user,
  ) {
    return await this.subscriptionService.createSubscription(
      recipientEmail,
      user.email,
    );
  }
}
