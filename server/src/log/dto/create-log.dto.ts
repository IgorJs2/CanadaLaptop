import mongoose from "mongoose";

export class CreateLogDto {
    user: mongoose.Schema.Types.ObjectId
    action: string
    laptopID: mongoose.Schema.Types.ObjectId | null
    partId: mongoose.Schema.Types.ObjectId | null
    orderId: mongoose.Schema.Types.ObjectId | null
    createdAt: mongoose.Schema.Types.ObjectId
}
