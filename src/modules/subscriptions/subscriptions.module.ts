import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { subscriptionsProviders } from './subscriptions.providers';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [...subscriptionsProviders],
})
export class SubscriptionsModule {}
