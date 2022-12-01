import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type InvoiceModelDocument = Invoice & Document;

@Schema()
export class Invoice {
 
@Prop()
 from: string
 
@Prop()
 to: string
 
@Prop() 
 title: string 
 
@Prop() 
 ebayList: string 
 
@Prop() 
 price: string
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "user"} )
 createdByUserId: mongoose.Schema.Types.ObjectId
 
@Prop() 
 createdAt: string 
}


export const InvoiceModelSchema = SchemaFactory.createForClass(Invoice);