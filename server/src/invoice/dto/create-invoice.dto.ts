import mongoose from "mongoose";

export class CreateInvoiceDto {
    from: mongoose.Schema.Types.ObjectId
    to: mongoose.Schema.Types.ObjectId
    title: string
    ebayList: string
    price: number
    createdByUserId: mongoose.Schema.Types.ObjectId
    createdAt: string
}