import {Body, Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import {CreateInvoiceDto} from "../invoice/dto/create-invoice.dto";
import {TSettings} from "../_types/chat/settings";
import {LogService} from "./log.service";

@Controller('log')
export class LogController {

    constructor(private LogService: LogService) {
    }

    @Get()
    async get_log() {
        return await this.LogService.get_log()
    }

    // @Post()
    // create_log(@Body() dto: CreateInvoiceDto ) {  || Log created by system by default
    //
    // }


    @Get("/suspicious")
    async get_suspicious_log(){
        return await this.LogService.get_suspicious_log()
    }

    @Get("/user")
    async get_user_logs(@Query("userId") userId: string){
        return await this.LogService.get_user_logs(userId)
    }

    @Put()
    async authorize_log(@Query("logId") logId: string){
        return await this.LogService.authorize_log(logId)
    }
}
