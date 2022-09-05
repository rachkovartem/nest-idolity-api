import { Field, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/users.schema';

@ObjectType()
export class Post {
  @Field(() => String)
  public _id: MongooseSchema.Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user' })
  @Field(() => String)
  public author: User;
  @Prop({
    default: new Date().toISOString(),
  })
  @Field(() => String)
  public date: string;
  @Field(() => String)
  public content: {
    text?: string;
    images?: string[];
    videos?: string[];
  };
}

export const PostSchema = SchemaFactory.createForClass(Post);
