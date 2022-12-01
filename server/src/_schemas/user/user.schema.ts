import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type UserModelDocument = User & Document;

@Schema()
export class User {

 @Prop()
 login: string 
 
 @Prop()
 full_name: string

 @Prop()
 type: string

 @Prop()
 avatar: string
 
 @Prop()
 email: string 
 
 @Prop()
 password: string 
 
 @Prop()
 mobile: string 
 
 @Prop({type: mongoose.Schema.Types.ObjectId, ref: "role" })
 _role: mongoose.Schema.Types.ObjectId[]
 
 @Prop([{type: mongoose.Schema.Types.ObjectId, ref: "time" }])
 _time: mongoose.Schema.Types.ObjectId[]
 
 @Prop([{type: mongoose.Schema.Types.ObjectId, ref: "log" }])
 _logs: mongoose.Schema.Types.ObjectId[]
}


export const UserModelSchema = SchemaFactory.createForClass(User);