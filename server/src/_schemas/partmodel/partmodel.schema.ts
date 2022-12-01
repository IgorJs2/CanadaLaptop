import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type PartmodelModelDocument = Partmodel & Document;

@Schema()
export class Partmodel {
 
@Prop() 
 searchID: string 
 
@Prop() 
 name: string 
 
@Prop() 
 price: number 
 
@Prop() 
 profit: number 
 
@Prop() 
 amount_paid: number 
 
@Prop( {type: mongoose.Schema.Types.ObjectId, ref: "laptop"})
 _laptop_model_id:  mongoose.Schema.Types.ObjectId
 
@Prop() 
 part_number: string 
 
@Prop() 
 mpn: string 
}


export const PartmodelModelSchema = SchemaFactory.createForClass(Partmodel);