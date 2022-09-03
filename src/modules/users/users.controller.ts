import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/auth/register')
  createItem(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
