import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {TimeService} from "./time.service";

@Controller('time')
export class TimeController {


    constructor(private TimeService: TimeService) {
    }

    @Post("start_count")
    async start_count(@Body("userId") userId: string) {
        return await this.TimeService.start_count(userId)
    }

    @Post("finish_count")
    async finish_count(@Body("userId") userId: string) {
        return await this.TimeService.finish_count(userId)
    }

    @Get("user")
    async get_user_time(@Query("userId") userId: string){
        return await this.TimeService.get_user_time(userId)
    }


}
