import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";
import {ItemStatus, TItemStatus} from "../../_types/_subTypes/ItemStatus";

export type PartModelDocument = Part & Document;

//@ts-ignore
mongoose.Schema.Types.ItemStatus = ItemStatus;

@Schema()
export class Part {
 
@Prop() 
 searchID: string 
 
@Prop() 
 img: string[] 
 
@Prop({type: mongoose.Schema.Types.ObjectId, ref: "laptop"} )
 _laptopID: mongoose.Schema.Types.ObjectId
 
@Prop() 
 _laptopSearchID: string 
 
@Prop() 
 price: number 
 
@Prop() 
 profit: number 
 
@Prop() 
 amount_paid: number

@Prop()
 item_status: number
 
@Prop() 
 title: string 
 
@Prop() 
 category: string
 
@Prop() 
 description: string 
 
@Prop() 
 ebaylist: string 
 
@Prop({type: String, ref: "user"})
 _createdBy: string
 
@Prop() 
 _createdAt: string 
}


export const PartModelSchema = SchemaFactory.createForClass(Part);