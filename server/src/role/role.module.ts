import {forwardRef, Module} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {RoleModelSchema} from "../_schemas/role/role.schema";
import {RoleModel} from "../_types/role/role";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'role',
        schema: RoleModelSchema,
        collection: 'roles',

      },
    ],'MainDb'),
    forwardRef(() => AuthModule),
  ],
  providers: [RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
