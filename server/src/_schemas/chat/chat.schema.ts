import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type ChatModelDocument = Chat & Document;

@Schema()
export class Chat {
 
@Prop() 
 type: string 
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "user"} )
 first_user:  mongoose.Schema.Types.ObjectId
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "user"} )
 second_user:  mongoose.Schema.Types.ObjectId
 
@Prop([{type: mongoose.Schema.Types.ObjectId, ref: "message"}] )
 messages: []
 
@Prop([{type: mongoose.Schema.Types.ObjectId, ref: "user"}] )
 users: []
}


export const ChatModelSchema = SchemaFactory.createForClass(Chat);