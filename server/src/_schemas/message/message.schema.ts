import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type MessageModelDocument = Message & Document;

@Schema()
export class Message {

@Prop({type: mongoose.Schema.Types.ObjectId, ref: "user"} )
 user: mongoose.Schema.Types.ObjectId
 
@Prop() 
 message: string

 @Prop()
 chat: mongoose.Schema.Types.ObjectId

 @Prop()
 checked: boolean
}


export const MessageModelSchema = SchemaFactory.createForClass(Message);