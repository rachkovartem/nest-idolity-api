import { Context, Query, Resolver } from '@nestjs/graphql';
import { User } from './schemas/users.schema';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UsersResolver {}
