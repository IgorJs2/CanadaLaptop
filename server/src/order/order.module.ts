import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {OrderModelSchema} from "../_schemas/order/order.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'order',
        schema: OrderModelSchema,
        collection: 'orders',

      },
    ],'MainDb'),
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
