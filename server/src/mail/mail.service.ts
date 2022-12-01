import { Injectable } from '@nestjs/common';
import {TSettings} from "../_types/chat/settings";
import {CreateMailDto} from "./dto/create-mail.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Schema} from "mongoose";
import {MailModel} from "../_types/mail/mail";
import {UserModel} from "../_types/user/user";

@Injectable()
export class MailService {

    constructor(@InjectModel("mail") private readonly MailModel:Model<MailModel>,
                @InjectModel("user") private readonly UserModel:Model<UserModel>) {
    }

    async get_user_mail(user: UserModel): Promise<MailModel[] | string> {
        try {
            if(!user){
                return "User not found"
            }

            const data = await this.MailModel.find({to: user._id.toString()}).populate({path: "to", select: {_id: 0, full_name: 1}}).populate({path: "from", select: {_id: 0, full_name: 1}})
            console.log(data[1])
            return data
        } catch (e) {
          console.log(e)
        }
    }

    async get_sended_mail(user: UserModel): Promise<MailModel[] | string> {
        try {

            if(!user){
                return "User not found"
            }

            const data = await this.MailModel.find({from: user._id.toString()})
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async send_mail(dto: CreateMailDto): Promise<MailModel | string> {
        try {
            const {message, to, from, short_name} = dto

            const ToUserCheck =  await this.UserModel.findOne({full_name: to}).lean()

            if(!ToUserCheck){
                return "User not found";
            }

            const FromUserCheck =  await this.UserModel.findById(from).lean()

            if(!FromUserCheck){
                return "Server error";
            }

            const newMail = await this.MailModel.create({
                ...dto,
                to: ToUserCheck._id,
                from: FromUserCheck._id,
                checked: false,
                favourite: false,
                date: new Date()
            })

            return await newMail.save()
        } catch (e) {
            console.log(e)
        }
    }

    async change_mail(mailId: string, settings: TSettings[]) {
        try {
            let mail = await this.MailModel.findOne({_id: mailId})

            if(!mail) {
                return "Notification not found"
            }

            for(let i = 0; i < settings.length; i++){
                mail[settings[i].field] = settings[i].newValue
            }

            await mail.save()

            return mail
        } catch (e) {
            console.log(e)
        }
    }

    async delete_mail(mailId: string) {
        try {
            let mail = await this.MailModel.findOneAndDelete({_id: mailId})

            if(!mail) {
                return "Notification not found"
            }

            return mail

        } catch (e) {
            console.log(e)
        }
    }

    async get_mail_info(user: string, id: string): Promise<MailModel | string> {
        try {
            const mailCheck = await this.MailModel.findById(id).populate("from", "full_name -_id").populate("to", "full_name -_id")


            if(!mailCheck){
                return "Mail not found"
            }

            const userCheck = await this.UserModel.findById(user)

            if(!userCheck){
                return "User not found"
            }

            //@ts-ignore
            if(mailCheck.from.full_name !== userCheck.full_name && mailCheck.to.full_name !== userCheck.full_name){
                return "Not you mail"
            }

            return mailCheck
        } catch (e) {
            console.log(e)
        }
    }
}
