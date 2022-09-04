import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../users/schemas/users.schema';
import { ConfigService } from '@nestjs/config';
import { Subscription } from './schemas/subscription.schema';
import { use } from 'passport';

@Injectable()
export class SubscriptionsService {
  constructor(
    @Inject('SUBSCRIPTION_MODEL')
    private subscriptionModel: Model<Subscription>,
    private configService: ConfigService,
  ) {}

  async createSubscription(recipientEmail: string, userEmail: string) {
    const subscription = await this.subscriptionModel.create({
      recipient: recipientEmail,
      subscriber: userEmail,
    });
    console.log(recipientEmail, userEmail);
    console.log(subscription);
    return subscription;
  }
}
