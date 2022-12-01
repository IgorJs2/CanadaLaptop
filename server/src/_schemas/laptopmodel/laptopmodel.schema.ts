import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type LaptopmodelModelDocument = Laptopmodel & Document;

@Schema()
export class Laptopmodel {
 
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
 
@Prop() 
 defects: string[] 
 
@Prop() 
 description: string 
 
@Prop() 
 moneybackdays: number 
}


export const LaptopmodelModelSchema = SchemaFactory.createForClass(Laptopmodel);