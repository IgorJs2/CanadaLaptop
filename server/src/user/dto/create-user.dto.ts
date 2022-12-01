import mongoose from "mongoose";

export class CreateUserDto {
    readonly login: string
    readonly full_name: string
    readonly avatar: string
    readonly type: string
    readonly email: string
    readonly password: string
    readonly mobile: string
    readonly _role: mongoose.Schema.Types.ObjectId
    readonly _time: mongoose.Schema.Types.ObjectId
    readonly _logs: mongoose.Schema.Types.ObjectId
}