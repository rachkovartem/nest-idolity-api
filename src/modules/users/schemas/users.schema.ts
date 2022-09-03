import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id?: MongooseSchema.Types.ObjectId;
  @Prop({
    minlength: [4, 'Name min length: 4'],
    required: [true, 'Email required'],
  })
  @Field(() => String, { description: 'User name ' })
  name: string;
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
      message: () => 'The specified email address is already in use.',
    },
    required: [true, 'Email required'],
  })
  @Field(() => String, { description: 'User email ' })
  email: string;
  @Prop({
    select: false,
    required: [true, 'Password required'],
  })
  @Field(() => String, { description: 'User role' })
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class LoginOutput extends OmitType(User, ['password']) {}
