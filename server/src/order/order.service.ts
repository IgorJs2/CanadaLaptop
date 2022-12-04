import { Injectable } from '@nestjs/common';
import {TSettings} from "../_types/chat/settings";
import {CreateOrderDto} from "./dto/create-order.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {OrderModel} from "../_types/order/order";
import {UserModel} from "../_types/user/user";
import mongoose from "mongoose";

@Injectable()
export class OrderService {

    constructor(@InjectModel("order") private readonly OrderModel:Model<OrderModel>) {
    }

    async get_orders(): Promise<OrderModel[] | string>  {
        try {
            const data = await this.OrderModel.find().populate({path: "createdByUserId", select: {full_name: 1, _id: 1}})
                                                    .populate({path: "laptop_id part_id", select: {searchID: 1, _id: 0}})
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async get_order(id: string): Promise<OrderModel | string>  {
        try {
            const data = await this.OrderModel.findOne({_id: id}).populate({path: "createdByUserId", select: {full_name: 1, _id: 1}}).populate({path: "laptop_id part_id", select: {searchID: 1, _id: 0}})
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async create_order(dto: CreateOrderDto): Promise<OrderModel | string> {
        try {
            const {createdByUserId, customerShippingAdress, customerName, part_id, tracknumber, price, laptop_id} = dto

            if(!createdByUserId || !customerShippingAdress || !customerName || !part_id || !tracknumber || !price || !laptop_id){
                return "Incorrect data"
            }

            const newOrder = await this.OrderModel.create({
                ...dto,
                createdAt: Date.now()
            })

            return await newOrder.save()

        } catch (e) {
            console.log(e)
        }
    }

    async change_order(orderId: string, settings: TSettings[]) {
        try {
            let order = await this.OrderModel.findOne({_id: orderId})

            if(!order) {
                return "Order not found"
            }

            for(let i = 0; i < settings.length; i++){
                order[settings[i].field] = settings[i].newValue
            }

            await order.save()

            return order
        } catch (e) {
            console.log(e)
        }
    }
}
