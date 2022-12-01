import {Body, Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import {CreateChatDto} from "../chat/dto/create-chat.dto";
import {TSettings} from "../_types/chat/settings";
import {CreateMessageDto} from "./dto/create-message.dto";

@Controller('message')
export class MessageController {

    @Get("/user")
    get_user_message(@Query("userId") userId: string) {

    }

    @Post()
    create_message(@Body() dto: CreateMessageDto ) {

    }

    @Put()
    change_status(@Query("messageId") messageId: string,
                  @Query("checked") checked: boolean){

    }

    @Delete()
    delete_message(@Query("messageId") messageId: string){

    }

}
