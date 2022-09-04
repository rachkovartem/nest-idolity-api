import { Field, ObjectType } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { User, UsersSchema } from '../../users/schemas/users.schema';

@ObjectType()
export class Subscription {
  @Field(() => String)
  public _id: MongooseSchema.Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user' })
  @Field(() => String)
  public subscriber: User;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user' })
  @Field(() => String)
  public recipient: User;
  @Prop({
    default: new Date().toISOString(),
  })
  @Field(() => String)
  public dateOfSubscribe: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
