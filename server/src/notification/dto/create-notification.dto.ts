import mongoose from "mongoose";
import {Prop} from "@nestjs/mongoose";

export class CreateNotificationDto {
    user: {type: mongoose.Schema.Types.ObjectId, ref: ""}

    text: string

    type: string

    checked: boolean
}