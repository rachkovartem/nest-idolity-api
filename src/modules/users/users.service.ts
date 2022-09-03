import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import e from 'express';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private usersModel: Model<User>,
  ) {}

  create(user: CreateUserDto) {
    const createdUser = new this.usersModel(user);
    return createdUser.save();
  }
}
