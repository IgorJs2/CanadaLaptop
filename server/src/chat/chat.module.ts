import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ChatModelSchema} from "../_schemas/chat/chat.schema";
import {UserModelSchema} from "../_schemas/user/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'chat',
        schema: ChatModelSchema,
        collection: 'chats',

      },
      {
        name: 'user',
        schema: UserModelSchema,
        collection: 'users',
      }
    ],'MainDb'),
  ],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
