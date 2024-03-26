import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IConversationsService } from './conversation';
import { CreateConversationDto } from './dtos/CreateConversation';
import { AuthUser } from '../utils/decorators';
import { User } from 'src/utils/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.CONVERSATIONS)
export class ConversationsController {
    constructor(@Inject(Services.CONVERSATIONS) private readonly conversationsService: IConversationsService,
        private readonly events: EventEmitter2
    ) { }
    
    @Post()
    async createConversation(@AuthUser() user: User, @Body() createConversationPayload: CreateConversationDto,) {
        console.log(createConversationPayload.id)
        const conversation = await this.conversationsService.createConversation(
            user, createConversationPayload
        );
        this.events.emit('conversation.create', conversation);
        return conversation;
    }

    @Get()
    async getConversations(@AuthUser() { id }: User) {
        return this.conversationsService.getConversations(id);
    }

    @Get(':id')
    async getConversationById(@Param('id') id: number) {
        return this.conversationsService.findById(id);
    }
}
