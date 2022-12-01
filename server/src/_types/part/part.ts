import * as mongoose from "mongoose";
import {TItemStatus} from "../_subTypes/ItemStatus";

export class PartModel {

 _id: mongoose.Schema.Types.ObjectId 
 
searchID: string 
 
img: string[] 
 
_laptopID: mongoose.Schema.Types.ObjectId 
 
_laptopSearchID: string 
 
price: number 
 
profit: number 
 
amount_paid: number 
 
item_status: number
 
title: string 
 
category: string
 
description: string 
 
ebaylist: string 
 
_createdBy: mongoose.Schema.Types.ObjectId 
 
_createdAt: string 

}