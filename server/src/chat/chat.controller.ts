import {Body, Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import {CreateChatDto} from "./dto/create-chat.dto";
import {TSettings} from "../_types/chat/settings";
import {ChatService} from "./chat.service";



@Controller('chat')
export class ChatController {

    constructor(private ChatService: ChatService) {
    }

    @Get()
    async get_chats(@Query("userId") userId: string) {
        return await this.ChatService.get_chats(userId)
    }

    @Post()
    async create_chat(@Body() dto: CreateChatDto ) {
        return await this.ChatService.create_chat(dto)
    }

    @Put("/user")
    async add_new_user_to_chat(@Query("userId") userId: string,
                         @Query("chatId") chatId: string){
        return await this.ChatService.add_new_user_to_chat(userId, chatId)
    }

    @Put()
    async change_chat_settings(@Query("settings") settings: TSettings[],
                         @Query("chatId") chatId: string){
        return await this.ChatService.change_chat_settings(chatId, settings)
    }

    @Delete()
    async delete_chat(@Query("chatId") chatId: string){
        return await this.ChatService.delete_chat(chatId)
    }


}
