import {forwardRef, Module} from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {MailModelSchema} from "../_schemas/mail/mail.schema";
import {UserModelSchema} from "../_schemas/user/user.schema";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'mail',
        schema: MailModelSchema,
        collection: 'mails',

      },
      {
        name: 'user',
        schema: UserModelSchema,
        collection: 'users',

      },
    ],'MainDb'),
    forwardRef(() => AuthModule)
  ],
  providers: [MailService],
  controllers: [MailController]
})
export class MailModule {}
