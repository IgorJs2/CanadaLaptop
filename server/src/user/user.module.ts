import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserModelSchema} from "../_schemas/user/user.schema";
import {UserModel} from "../_types/user/user";
import {RoleModelSchema} from "../_schemas/role/role.schema";


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
        name: 'role',
        schema: RoleModelSchema,
        collection: 'roles',

      },
    ],'MainDb'),
      UserModel,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
