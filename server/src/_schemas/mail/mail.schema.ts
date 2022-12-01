import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type MailModelDocument = Mail & Document;

@Schema()
export class Mail {


    @Prop({type: String, ref: "user"})
    from: string

    @Prop()
    message: string

    @Prop({type: String, ref: "user"})
    to: string

    @Prop()
    checked: boolean

    @Prop()
    favourite: boolean

    @Prop()
    short_name: string

    @Prop()
    date: string

}


export const MailModelSchema = SchemaFactory.createForClass(Mail);