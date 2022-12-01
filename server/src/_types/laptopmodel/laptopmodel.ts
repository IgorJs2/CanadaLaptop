import * as mongoose from "mongoose";

export class LaptopmodelModel {

 _id: mongoose.Schema.Types.ObjectId 
 
 searchID: string

 name: string

 price: number

 profit: number

 amount_paid: number

 defects: string[]

 description: string

 moneybackdays: number

}

export class LaptopmodelListItem {
 _id: mongoose.Schema.Types.ObjectId

 searchID: string

 name: string
}