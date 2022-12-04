import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type OrderModelDocument = Order & Document;

@Schema()
export class Order {
 
@Prop({type: String, ref: "laptop"})
 laptop_id:string
 
@Prop({type: String, ref: "part"} )
 part_id:  string
 
@Prop() 
 customerName: string 
 
@Prop() 
 customerShippingAdress: string 
 
@Prop() 
 tracknumber: string 
 
@Prop() 
 price: string

 @Prop({type: mongoose.Schema.Types.ObjectId, ref: "user"} )
 createdByUserId: mongoose.Schema.Types.ObjectId
 
@Prop() 
 createdAt: string
}


export const OrderModelSchema = SchemaFactory.createForClass(Order);