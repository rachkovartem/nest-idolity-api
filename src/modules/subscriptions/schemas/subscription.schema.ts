import { Field, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/users.schema';

@ObjectType()
export class Subscription {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Field(() => String)
  subscriber: string;
  @Field(() => String)
  recipient: string;
  @Prop({
    default: new Date().toISOString(),
  })
  @Field(() => String)
  dateOfSubscribe: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
