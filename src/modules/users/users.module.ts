import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { userProviders } from './users.providers';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
})
export class UsersModule {}
