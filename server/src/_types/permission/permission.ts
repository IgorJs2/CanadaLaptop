import * as mongoose from "mongoose";

export class PermissionModel {

 _id: mongoose.Schema.Types.ObjectId 
 
permission: string 
 
active: boolean 

}