import * as mongoose from "mongoose";

export class LogModel {

 _id: mongoose.Schema.Types.ObjectId 
 
 user: mongoose.Schema.Types.ObjectId

 type: string

 action: string

 laptopID: mongoose.Schema.Types.ObjectId

 partId: mongoose.Schema.Types.ObjectId

 orderId: mongoose.Schema.Types.ObjectId

 createdAt: string

}