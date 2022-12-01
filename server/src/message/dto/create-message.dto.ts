import mongoose from "mongoose";

export class CreateMessageDto {
    user: mongoose.Schema.Types.ObjectId
    message: string
    chat: mongoose.Schema.Types.ObjectId
    checked: boolean
}