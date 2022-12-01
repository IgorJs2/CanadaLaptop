import { Injectable } from '@nestjs/common';
import {CreateChatDto} from "./dto/create-chat.dto";
import {TSettings} from "../_types/chat/settings";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model, Schema, Types} from "mongoose";
import {ChatModel} from "../_types/chat/chat";
import {UserModel} from "../_types/user/user";




@Injectable()
export class ChatService {

    constructor(@InjectModel("chat") private readonly ChatModel:Model<ChatModel>,
                @InjectModel("user") private readonly UserModel:Model<UserModel>) {
    }

    async get_chats(userId: string): Promise<ChatModel[]> {
        try {
            const data = await this.ChatModel.find(
                //@ts-ignore
                { users: {$in : [mongoose.Types.ObjectId(userId)]}   }
            )

            return data
        } catch (e) {
            console.log(e)
        }
    }

    async create_chat(dto: CreateChatDto): Promise<ChatModel | string> {
        try {
            const {type, second_user, first_user, users, messages} = dto

            if(!type || !second_user || !first_user || !users){
                return "Incorrect data"
            }

            const newChat = await this.ChatModel.create({
                ...dto,
                // @ts-ignore
                ["users"]: JSON.parse(dto.users),
                // @ts-ignore
                ["messages"]: JSON.parse(dto.messages),
            })

            return await newChat.save()

        } catch (e) {
            console.log(e)
        }
    }


    async add_new_user_to_chat(userId: string, chatId: string): Promise<ChatModel | string> {
        try {
            const checkUser = await this.UserModel.findOne({_id: userId})

            if(!checkUser){
                return "User not found"
            }

            let checkChat = await this.ChatModel.findOne({_id: chatId})

            if(!checkChat){
                return "Chat not found"
            }

            checkChat.users.push(checkUser._id)

            return await checkChat.save()

        } catch (e) {
            console.log(e)
        }
    }

    async change_chat_settings(chatId: string, settings: TSettings[]): Promise<ChatModel | string> {
        try {
            let chat = await this.ChatModel.findOne({_id: chatId})

            if(!chat) {
                return "Chat not found"
            }

            for(let i = 0; i < settings.length; i++){
                chat[settings[i].field] = settings[i].newValue
            }

            await chat.save()

            return chat

        } catch (e) {
            console.log(e)
        }
    }

    async delete_chat(chatId: string): Promise<string> {
        try {
            let chat = await this.ChatModel.findOneAndDelete({_id: chatId})
            return "Successfully"
        } catch (e) {
            console.log(e)
            return "Chat not found"
        }
    }

}
