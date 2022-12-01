import mongoose from "mongoose";

export class CreateOrderDto {
    laptop_id: mongoose.Schema.Types.ObjectId
    part_id: mongoose.Schema.Types.ObjectId
    customerName: string
    customerShippingAdress: string
    tracknumber: string
    price: number
    createdByUserId: mongoose.Schema.Types.ObjectId
    createdAt: string
}