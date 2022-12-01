import {forwardRef, Module} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {PermissionModelSchema} from "../_schemas/permission/permission.schema";
import {RoleModelSchema} from "../_schemas/role/role.schema";
import {AuthModule} from "../auth/auth.module";
import {RoleModel} from "../_types/role/role";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'permission',
        schema: PermissionModelSchema,
        collection: 'permissions',

      },
    ],'MainDb'),
    MongooseModule.forFeature([
      {
        name: 'role',
        schema: RoleModelSchema,
        collection: 'roles',

      },
    ],'MainDb'),
  ],
  providers: [PermissionService],
  controllers: [PermissionController]
})
export class PermissionModule {}
