import * as mongoose from "mongoose";

export class OrderModel {

 _id: mongoose.Schema.Types.ObjectId 
 
laptop_id: mongoose.Schema.Types.ObjectId 
 
part_id: mongoose.Schema.Types.ObjectId 
 
customerName: string 
 
customerShippingAdress: string 
 
tracknumber: string 
 
price: string
 
createdByUserId: mongoose.Schema.Types.ObjectId 
 
createdAt: string

}