import { Injectable } from '@nestjs/common';
import {TSettings} from "../_types/chat/settings";
import {CreateBoardTaskDto} from "./dto/create-board-task.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {BoardtaskModel} from "../_types/board_task/board_task";

@Injectable()
export class BoardTaskService {

    constructor(@InjectModel("board_task") private readonly BoardTaskModel:Model<BoardtaskModel>) {
    }

    async get_board_tasks(type: string): Promise<BoardtaskModel[]> {
        try {
            if(type) return await this.BoardTaskModel.find({status: type})

            return await this.BoardTaskModel.find()
        } catch (e) {
            console.log(e)
        }
    }

    async create_board_task(dto: CreateBoardTaskDto): Promise<BoardtaskModel> {
        try {
            const {from, task, status, created_by, to, decription} = dto

            const newTask = await this.BoardTaskModel.create({
                ...dto
            })

            await newTask.save()

            return newTask
        } catch (e) {
            console.log(e)
        }
    }

    async change_board_task(taskId: string, settings: TSettings[]): Promise<BoardtaskModel | string> {
        try {
            let task = await this.BoardTaskModel.findOne({_id: taskId})

            if(!task) {
                return "Task not found"
            }

            for(let i = 0; i < settings.length; i++){
                task[settings[i].field] = settings[i].newValue
            }

            await task.save()

            return task

        } catch (e) {
            console.log(e)
        }
    }

    async delete_board_task(taskId: string): Promise<BoardtaskModel | string> {
        try {
            let task = await this.BoardTaskModel.findOneAndDelete({_id: taskId})

            if(!task) {
                return "Task not found"
            }

            return task

        } catch (e) {
            console.log(e)
        }
    }
}
