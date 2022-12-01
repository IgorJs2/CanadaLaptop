import {forwardRef, Module} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserModelSchema} from "../_schemas/user/user.schema";
import {NotificationModelSchema} from "../_schemas/notification/notification.schema";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
        {
            name: 'user',
            schema: UserModelSchema,
            collection: 'users',

        },
    ],'MainDb'),
    MongooseModule.forFeature([
        {
            name: 'notification',
            schema: NotificationModelSchema,
            collection: 'notifications',

        },
    ],'MainDb'),
      forwardRef(() => AuthModule),
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService]
})
export class NotificationModule {}
