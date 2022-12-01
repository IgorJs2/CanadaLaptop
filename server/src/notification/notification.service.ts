import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserModel} from "../_types/user/user";
import {NotificationModel} from "../_types/notification/notification";

@Injectable()
export class NotificationService {
    constructor(@InjectModel('user') private readonly UserModel:Model<UserModel>,
                @InjectModel('notification') private readonly NotificationModel:Model<NotificationModel>,) {
    }


    async send_notification(userId: string, text: string, type: string): Promise<NotificationModel | string>{
        try {
            const user = await this.UserModel.findOne({userId})
            if(user){
                const notification = await this.NotificationModel.create({
                    user: userId,
                    text,
                    type,
                    checked: false
                })
                return notification
            }
            return "User not found"


        } catch (e) {
            console.log(e)
            return "Error"
        }
    }

    async change_status(notificationId: string, checked: boolean) {

    }

    async get_user_notification(userId: string): Promise<NotificationModel[] | string> {
        try{
           const user = await this.UserModel.findOne({userId})
           if(user){
               const notififcations = await this.NotificationModel.find({user: userId})
               return notififcations;
           }
            return "User not found"
        } catch (e) {
            console.log(e)
            return "Error"
        }
    }
}
