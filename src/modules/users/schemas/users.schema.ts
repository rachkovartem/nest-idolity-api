import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscription } from '../../subscriptions/schemas/subscription.schema';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  public _id?: MongooseSchema.Types.ObjectId;
  @Prop({
    minlength: [4, 'minLength4'],
    required: [true, 'emailRequired'],
  })
  @Field(() => String, { description: 'User name ' })
  public name: string;
  @Prop({
    unique: true,
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          return this.id === user.id;
        }
        return true;
      },
      message: () => 'emailAlreadyInUse',
    },
    required: [true, 'emailRequired'],
  })
  @Field(() => String, { description: 'User email ' })
  public email: string;
  @Prop({
    select: false,
    required: [true, 'passwordRequired'],
  })
  @Field(() => String, { description: 'User password' })
  public password: string;
  @Prop({
    type: Array,
    default: [],
  })
  @Prop({ type: [Subscription], ref: Subscription.name })
  @Field(() => [Subscription])
  public subscriptions?: Subscription[];
}

export const UsersSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class UserOmitPassword extends OmitType(User, ['password']) {}
