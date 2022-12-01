import * as mongoose from "mongoose";

export class UserModel {

 _id: mongoose.Schema.Types.ObjectId

 login: string

 full_name: string

 type: string

 avatar: string

 email: string

 password: string

 mobile: string

 _role: mongoose.Schema.Types.ObjectId[]

 _time: mongoose.Schema.Types.ObjectId[]

 _logs: mongoose.Schema.Types.ObjectId[]

}