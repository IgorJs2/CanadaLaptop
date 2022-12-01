import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type OrderModelDocument = Order & Document;

@Schema()
export class Order {
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "laptop"})
 laptop_id:  mongoose.Schema.Types.ObjectId
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "part"} )
 part_id:  mongoose.Schema.Types.ObjectId
 
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