import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {LogModel} from "../_types/log/log";
import {UserModel} from "../_types/user/user";

@Injectable()
export class LogService{

    constructor(@InjectModel("log") private readonly LogModel:Model<LogModel>,
                @InjectModel("user") private readonly UserModel:Model<UserModel>) {
    }

    async get_log(): Promise<LogModel[]> {
        try {
            const data = await this.LogModel.find();
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async get_suspicious_log(): Promise<LogModel[]> {
        try {
            const data = await this.LogModel.find({ type: "suspicious"});
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async get_user_logs(userId: string): Promise<LogModel[] | string> {
        try {
            const userCheck = await this.UserModel.findById(userId)

            if(!userCheck){
                return "User not found"
            }

            const data = await this.LogModel.find({user: userCheck._id})
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async authorize_log(logId: string) {
        try {
            const logCheck = await this.LogModel.findById(logId);

            if(!logCheck){
                return "Log not found"
            }

            logCheck["type"] = "authorized"

            return await logCheck.save()
        } catch (e) {
            console.log(e)
        }
    }
}
