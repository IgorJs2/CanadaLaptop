import { Module } from '@nestjs/common';
import { BoardTaskService } from './board_task.service';
import { BoardTaskController } from './board_task.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {LaptopModelSchema} from "../_schemas/laptop/laptop.schema";
import {BoardtaskModelSchema} from "../_schemas/board_task/board_task.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'board_task',
        schema: BoardtaskModelSchema,
        collection: 'board_tasks',

      },
    ],'MainDb'),
  ],
  providers: [BoardTaskService],
  controllers: [BoardTaskController]
})
export class BoardTaskModule {}
