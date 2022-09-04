import { Connection } from 'mongoose';
import { SubscriptionSchema } from './schemas/subscription.schema';

export const subscriptionsProviders = [
  {
    provide: 'SUBSCRIPTION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('subscription', SubscriptionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
