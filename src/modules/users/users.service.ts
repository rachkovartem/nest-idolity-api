import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import e from 'express';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private usersModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async create(user: User) {
    const salt = Number(this.configService.get('database.saltOrRounds'));
    const hash = await bcrypt.hash(user.password, salt);
    const createdUser = new this.usersModel({ ...user, password: hash });
    return await createdUser.save();
  }

  getUserWithPassword(email: string) {
    return this.usersModel.findOne({ email }).select('+password').exec();
  }

  getUser(email: string) {
    return this.usersModel.findOne({ email }).exec();
  }
}
