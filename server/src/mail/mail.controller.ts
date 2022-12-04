import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Put,
    Query,
    Req,
    UseGuards
} from '@nestjs/common';
import {CreateChatDto} from "../chat/dto/create-chat.dto";
import {TSettings} from "../_types/chat/settings";
import {CreateMailDto} from "./dto/create-mail.dto";
import {MailService} from "./mail.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Types} from "../auth/types-auth.decorator";
import {TypesGuard} from "../auth/types.guard";

@Controller('mail')
export class MailController {

    constructor(private MailService: MailService) {

    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get("/user")
    async get_user_mail(@Req() request) {
        const data = await this.MailService.get_user_mail(request.user)
        if(typeof data === "string"){
            throw new HttpException(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get("/info")
    async get_mail_info(@Req() request, @Query("id") id: string) {
        return await this.MailService.get_mail_info(request.user, id)
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get("/sended")
    async get_sended_mail(@Req() request) {
        return await this.MailService.get_sended_mail(request.user)
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Post()
    async send_mail(@Body() dto: CreateMailDto) {
        return await this.MailService.send_mail(dto)
    }

    @Put()
    async change_mail(@Query("settings") settings: TSettings[],
                         @Query("mailId") mailId: string){
        return await this.MailService.change_mail(mailId, settings)
    }

    @Delete()
    async delete_mail(@Query("mailId") mailId: string){
        return await this.MailService.delete_mail(mailId)
    }

}
