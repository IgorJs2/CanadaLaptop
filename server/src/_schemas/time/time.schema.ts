import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type TimeModelDocument = Time & Document;

@Schema()
export class Time {
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "user"} )
 user: mongoose.Schema.Types.ObjectId
 
@Prop() 
 date_start: string 
 
@Prop() 
 date_finish: string 
 
@Prop() 
 total: number 
}


export const TimeModelSchema = SchemaFactory.createForClass(Time);