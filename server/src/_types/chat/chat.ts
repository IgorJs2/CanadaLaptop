import * as mongoose from "mongoose";

export class ChatModel {

 _id: mongoose.Schema.Types.ObjectId 
 
 type: string

 first_user: mongoose.Schema.Types.ObjectId

 second_user: mongoose.Schema.Types.ObjectId

 messages: mongoose.Schema.Types.ObjectId

 users: mongoose.Schema.Types.ObjectId[]

}