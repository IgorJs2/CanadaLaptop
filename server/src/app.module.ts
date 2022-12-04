import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from './file/file.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as path from "path"
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import { PartsModule } from './parts/parts.module';
import { PartmodelsModule } from './partmodels/partmodels.module';
import { LaptopmodelsModule } from './Laptopmodels/Laptopmodels.module';
import { LaptopModule } from './laptop/laptop.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { TimeModule } from './time/time.module';
import { LogModule } from './log/log.module';
import { OrderModule } from './order/order.module';
import { MessageModule } from './message/message.module';
import { MailModule } from './mail/mail.module';
import { NotificationModule } from './notification/notification.module';
import { BoardTaskModule } from './board_task/board_task.module';
import { ChatModule } from './chat/chat.module';
import { InvoiceModule } from './invoice/invoice.module';
import {PartModelSchema} from "./_schemas/part/part.schema";
import {UserModelSchema} from "./_schemas/user/user.schema";
import {UserModel} from "./_types/user/user";
import * as process from "process";


require('dotenv').config()


@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.join(__dirname, "static")}),
        MongooseModule.forRoot(
            (process.env.MONGO_URI + '/canadanotebooks'),
            {
                dbName: "canadanotebooks",
                connectionName: 'MainDb',
            }
        ),
        FileModule, UserModule, AuthModule, PartsModule, PartmodelsModule, LaptopmodelsModule,
        LaptopModule, RoleModule, PermissionModule, TimeModule, LogModule, OrderModule, MessageModule,
        MailModule, NotificationModule, BoardTaskModule, ChatModule, InvoiceModule
    ],
    providers: [AppService],
    controllers: [AppController],
})
export class AppModule {

}