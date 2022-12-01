import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, Schema} from "mongoose";
import {TimeModel} from "../_types/time/time";
import {UserModel} from "../_types/user/user";


@Injectable()
export class TimeService {

    constructor(@InjectModel("time") private readonly TimeModel:Model<TimeModel>,
                @InjectModel("user") private readonly UserModel:Model<UserModel>) {
    }

    async start_count(userId: string): Promise<TimeModel | string> {
        try {
            const userCheck = await this.UserModel.findById(userId)

            if(!userCheck){
                return "User not found"
            }

            const startCount = await this.TimeModel.create({
                user: userCheck._id,
                date_start: Date.now(),
                date_finish: "",
                total: 0,
            })

            return await startCount.save()

        } catch (e) {
            console.log(e)
        }
    }

    async finish_count(userId: string): Promise<TimeModel | string> {
        try {
            const userCheck = await this.UserModel.findById(userId)

            if(!userCheck){
                return "User not found"
            }

            let startedCount = await this.TimeModel.findOne({user: userCheck._id, date_finish: ""})

            startedCount["date_finish"] = Date.now().toString()
            startedCount["total"] = Number(startedCount.date_start) - Date.now()

            return await startedCount.save()

        } catch (e) {
            console.log(e)
        }
    }

    async get_user_time(userId: string): Promise<number | string> {
        try {
            const userCheck = await this.UserModel.findById(userId)

            if(!userCheck){
                return "User not found"
            }

            const userTime = await this.TimeModel.find({user: userCheck._id})

            return userTime.reduce((sum, {total}) => sum + total, 0)

        } catch (e) {
            console.log(e)
        }
    }
}
