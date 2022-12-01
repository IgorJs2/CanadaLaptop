import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type LogModelDocument = Log & Document;

@Schema()
export class Log {
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "users"} )
 user: mongoose.Schema.Types.ObjectId

 @Prop()
 type: string
 
@Prop() 
 action: string 
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "laptops"})
 laptopID: mongoose.Schema.Types.ObjectId
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "parts"})
 partId: mongoose.Schema.Types.ObjectId
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "orders"})
 orderId: mongoose.Schema.Types.ObjectId
 
@Prop() 
 createdAt: string
}


export const LogModelSchema = SchemaFactory.createForClass(Log);