import * as mongoose from "mongoose";

export class TimeModel {

 _id: mongoose.Schema.Types.ObjectId 
 
user: mongoose.Schema.Types.ObjectId 
 
date_start: string 
 
date_finish: string 
 
total: number 

}