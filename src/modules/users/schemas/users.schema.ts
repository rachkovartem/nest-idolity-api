import { Field, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id?: MongooseSchema.Types.ObjectId;
  @Prop()
  @Field(() => String, { description: 'User name ' })
  name: string;
  @Prop()
  @Field(() => String, { description: 'User email ' })
  email: string;
  @Prop({ select: false })
  @Field(() => String, { description: 'User role' })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
