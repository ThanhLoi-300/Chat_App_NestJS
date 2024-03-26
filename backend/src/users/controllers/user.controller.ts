import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';
import { Routes, Services } from '../../utils/constants';
import { IUserService } from '../interfaces/user';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';

@Controller(Routes.USERS)
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  @Get('search')
  searchUsers(@AuthUser() user: User, @Query('query') query: string) {
    if (!query)
      throw new HttpException('Provide a valid query', HttpStatus.BAD_REQUEST);
    return this.userService.searchUsers(query, user);
  }

  @Get('check')
  async checkUsername(@Query('name') name: string) {
    if (!name)
      throw new HttpException('Invalid Query', HttpStatus.BAD_REQUEST);
    const user = await this.userService.findUser({ name });
    if (user) throw new HttpException('User already exists', HttpStatus.CONFLICT);
    return HttpStatus.OK;
  }
}