import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { subscriptionsProviders } from './subscriptions.providers';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsResolver } from './subscriptions.resolver';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [
    ...subscriptionsProviders,
    SubscriptionsService,
    SubscriptionsResolver,
  ],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
