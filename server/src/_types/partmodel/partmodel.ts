import * as mongoose from "mongoose";

export class PartmodelModel {

 _id: mongoose.Schema.Types.ObjectId 
 
searchID: string 
 
name: string 
 
price: number 
 
profit: number 
 
amount_paid: number 
 
_laptop_model_id: mongoose.Schema.Types.ObjectId 
 
part_number: string 
 
mpn: string 

}