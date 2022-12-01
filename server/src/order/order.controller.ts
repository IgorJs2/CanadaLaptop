import {Body, Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import {TSettings} from "../_types/chat/settings";
import {CreateOrderDto} from "./dto/create-order.dto";
import {OrderService} from "./order.service";

@Controller('order')
export class OrderController {

    constructor(private OrderService: OrderService) {
    }

    @Get()
                               async get_orders() {
        return await this.OrderService.get_orders()
    }

    @Get("info")
    async get_order(@Query("id") id: string) {
        return await this.OrderService.get_order(id)
    }

    @Post()
    async create_order(@Body() dto: CreateOrderDto ) {
        return await this.OrderService.create_order(dto)
    }

    @Put()
    async change_order(@Query("settings") settings: TSettings[],
                         @Query("orderId") orderId: string){
        return await this.OrderService.change_order(orderId, settings)
    }

}
