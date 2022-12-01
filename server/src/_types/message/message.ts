import * as mongoose from "mongoose";

export class MessageModel {

 _id: mongoose.Schema.Types.ObjectId 
 
 user: mongoose.Schema.Types.ObjectId
 
 message: string

 chat: mongoose.Schema.Types.ObjectId

 checked: boolean
}