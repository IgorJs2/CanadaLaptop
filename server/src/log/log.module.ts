import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {LogModelSchema} from "../_schemas/log/log.schema";
import {UserModelSchema} from "../_schemas/user/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'log',
        schema: LogModelSchema,
        collection: 'logs',

      },
      {
        name: 'user',
        schema: UserModelSchema,
        collection: 'users',

      },
    ],'MainDb'),
  ],
  providers: [LogService],
  controllers: [LogController]
})
export class LogModule {}


