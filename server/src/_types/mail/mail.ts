import * as mongoose from "mongoose";

export class MailModel {

    _id: mongoose.Schema.Types.ObjectId

    from: string

    message: string

    to: string

    checked: boolean

    favourite: boolean

    short_name: string

    date: string

}