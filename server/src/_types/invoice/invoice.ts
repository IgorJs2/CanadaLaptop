import * as mongoose from "mongoose";

export class InvoiceModel {

 _id: mongoose.Schema.Types.ObjectId 
 
from: string
 
to: string
 
title: string 
 
ebayList: string 
 
price: string
 
createdByUserId: mongoose.Schema.Types.ObjectId 
 
createdAt: string 

}