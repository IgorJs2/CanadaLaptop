import {Body, Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import {CreateBoardTaskDto} from "./dto/create-board-task.dto";
import {TSettings} from "../_types/chat/settings";
import {BoardTaskService} from "./board_task.service";

@Controller('board-task')
export class BoardTaskController {

    constructor(private BoardTaskService: BoardTaskService) {
    }

    @Get()
    async get_board_tasks(@Query("type") type: string){
        return await this.BoardTaskService.get_board_tasks(type)
    }

    @Post()
    async create_board_task(@Body() dto: CreateBoardTaskDto){
        return await this.BoardTaskService.create_board_task(dto)
    }

    @Put()
    async change_board_task(@Query("taskId") taskId: string, @Query("settings") settings: TSettings[]){
        return await this.BoardTaskService.change_board_task(taskId, settings)
    }

    @Delete()
    async delete_board_task(@Query("taskId") taskId: string){
        return await this.BoardTaskService.delete_board_task(taskId)
    }



}
