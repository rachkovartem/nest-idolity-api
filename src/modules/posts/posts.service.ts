import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_MODEL')
    private subscriptionModel: Model<Post>,
  ) {}
}
