import mongoose from "mongoose";

export class CreateChatDto {
    type: string
    first_user: mongoose.Schema.Types.ObjectId
    second_user: mongoose.Schema.Types.ObjectId
    messages: mongoose.Schema.Types.ObjectId
    users: mongoose.Schema.Types.ObjectId[]
}