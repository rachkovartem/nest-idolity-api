import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  public _id?: Types.ObjectId;
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

  @Prop([{ type: Types.ObjectId, ref: 'user' }])
  @Field(() => [User])
  public subscriptions?: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'user' }])
  @Field(() => [User])
  public subscribers?: Types.ObjectId;
}

export const UsersSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class UserOmitPassword extends OmitType(User, ['password']) {}
