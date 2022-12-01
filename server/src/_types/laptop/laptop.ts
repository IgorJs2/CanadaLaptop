import * as mongoose from "mongoose";
import {TItemStatus} from "../_subTypes/ItemStatus";

export class LaptopModel {

 _id: mongoose.Schema.Types.ObjectId
 
searchID: string 
 
img: string[] 
 
model: string 
 
daysfrompaym: number 
 
price: number
 
profit: number
 
amount_paid: number
 
item_status: number
 
title: string 
 
category: string[] 
 
description: string 
 
tracknumber: string 
 
ebaylist: string 
 
moneybackdays: number 
 
_createdBy: mongoose.Schema.Types.ObjectId 
 
_createdAt: string 

}