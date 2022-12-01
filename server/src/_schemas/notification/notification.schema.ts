import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type NotificationModelDocument = Notification & Document;

@Schema()
export class Notification {
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "user"} )
 user:  mongoose.Schema.Types.ObjectId
 
@Prop() 
 text: string 
 
@Prop() 
 type: string 
 
@Prop() 
 checked: boolean 
}


export const NotificationModelSchema = SchemaFactory.createForClass(Notification);