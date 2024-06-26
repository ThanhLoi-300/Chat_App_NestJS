import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SkipThrottle } from '@nestjs/throttler';
import { Routes, ServerEvents, Services } from '../utils/constants';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';
import { IFriendsService } from './friends';
import { AuthenticatedRequest } from 'src/utils/types';

@SkipThrottle()
@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor(
    @Inject(Services.FRIENDS_SERVICE)
    private readonly friendsService: IFriendsService,
    private readonly event: EventEmitter2,
  ) {}

  @Get()
  getFriends(@Req() req: AuthenticatedRequest) {
    console.log('Fetching Friends');
    return this.friendsService.getFriends(req.userId);
  }

  @Delete(':id/delete')
  async deleteFriend(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const friend = await this.friendsService.deleteFriend({ id, userId: req.userId });
    // this.event.emit(ServerEvents.FRIEND_REMOVED, { friend, userId });
    return friend;
  }
}