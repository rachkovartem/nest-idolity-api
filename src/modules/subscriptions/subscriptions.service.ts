import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../users/schemas/users.schema';
import { ConfigService } from '@nestjs/config';
import { Subscription } from './schemas/subscription.schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject('SUBSCRIPTION_MODEL')
    private subscriptionModel: Model<Subscription>,
    private configService: ConfigService,
  ) {}

  async createSubscription(recipientEmail: string, userEmail: string) {
    const subscribtion = new this.subscriptionModel({
      recipient: recipientEmail,
      subscriber: userEmail,
    });
    return await subscribtion.save();
  }
}
