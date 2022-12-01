import * as mongoose from "mongoose";

export class RoleModel {

 _id: mongoose.Schema.Types.ObjectId 
 
name: string 
 
_permissions: mongoose.Schema.Types.ObjectId 
 
active: boolean 

}