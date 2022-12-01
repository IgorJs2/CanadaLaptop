import * as mongoose from "mongoose";

export class NotificationModel {

 _id: mongoose.Schema.Types.ObjectId 
 
user: mongoose.Schema.Types.ObjectId 
 
text: string 
 
type: string 
 
checked: boolean 

}