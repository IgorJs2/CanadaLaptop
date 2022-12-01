import { Module } from '@nestjs/common';
import { TimeService } from './time.service';
import { TimeController } from './time.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {TimeModelSchema} from "../_schemas/time/time.schema";
import {UserModelSchema} from "../_schemas/user/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'time',
        schema: TimeModelSchema,
        collection: 'times',

      },
      {
        name: 'user',
        schema: UserModelSchema,
        collection: 'users',

      }
    ],'MainDb'),
  ],
  providers: [TimeService],
  controllers: [TimeController]
})
export class TimeModule {}
