import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';

@Schema({
  validateBeforeSave: true,
})
@ObjectType()
export class User {
  @Field(() => String)
  public _id?: Types.ObjectId;
  @Prop({
    minlength: [4, 'tKey:minLengthName'],
    required: [true, 'tKey:emailRequired'],
  })
  @Field(() => String)
  public name: string;
  @Prop({
    unique: true,
    validate: [
      {
        validator: async function (email) {
          const user = await this.constructor.findOne({ email });
          if (user) {
            return this.id === user.id;
          }
          return true;
        },
        message: () => 'tKey:emailAlreadyInUse',
      },
      {
        validator: function (email) {
          try {
            const emailSchema = Joi.object({
              email: Joi.string().email(),
            });
            emailSchema.validate({ email });
            return true;
          } catch (error) {
            return false;
          }
        },
        message: () => 'tKey:incorrectEmailFormat',
      },
    ],
    required: [true, 'tKey:emailRequired'],
  })
  @Field(() => String)
  public email: string;

  @Prop({
    select: false,
    required: [true, 'tKey:passwordRequired'],
  })
  @Field(() => String)
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
