import {Body, Controller, Delete, Get, Post, Put, Query, UseGuards} from '@nestjs/common';
import {CreateChatDto} from "../chat/dto/create-chat.dto";
import {NotificationService} from "./notification.service";
import {Permissions} from "../auth/permissions.decorator";
import {PermissionsGuard} from "../auth/permissions.guard";

@Controller('notification')
export class NotificationController {

    constructor(private NotificationService: NotificationService) {
    }

    // @Get()
    // send(){  // Default by system
    //     return this.NotificationService.send_notification("63102b03a2933f7eaa8f82e3", "Hello world", "common")
    // }

    @Permissions("Allow to permissions")
    @UseGuards(PermissionsGuard)
    @Get("/user")
    async get_user_notification(@Query("userId") userId: string)
    {
        return this.NotificationService.get_user_notification(userId)
    }

    @Put()
    async change_status(@Query("notificationId") notificationId: string,
                        @Query("checked") checked: boolean)
    {
        return this.NotificationService.change_status(notificationId, checked)
    }
}
