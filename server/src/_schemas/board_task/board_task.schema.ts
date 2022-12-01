import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type BoardtaskModelDocument = Boardtask & Document;

@Schema()
export class Boardtask {
 
@Prop( {type: mongoose.Schema.Types.ObjectId, ref: "user"} )
 created_by: mongoose.Schema.Types.ObjectId
 
@Prop() 
 task: string 
 
@Prop() 
 decription: string 
 
@Prop() 
 status: string 
 
@Prop() 
 from: string
 
@Prop() 
 to: string 
}


export const BoardtaskModelSchema = SchemaFactory.createForClass(Boardtask);