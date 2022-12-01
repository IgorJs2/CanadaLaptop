import * as mongoose from "mongoose";

export class BoardtaskModel {

 _id: mongoose.Schema.Types.ObjectId 
 
 created_by: mongoose.Schema.Types.ObjectId

 task: string

 decription: string

 status: string

 from: string

 to: string

}