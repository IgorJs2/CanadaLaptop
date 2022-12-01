import {forwardRef, Module} from '@nestjs/common';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "../auth/auth.module";
import {PartModelSchema} from "../_schemas/part/part.schema";
import {PartModel} from "../_types/part/part";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'part',
        schema: PartModelSchema,
        collection: 'parts',

      },
    ],'MainDb'),
      PartModel,
    forwardRef(() => AuthModule),
  ],
  providers: [PartsService],
  controllers: [PartsController]
})
export class PartsModule {}
