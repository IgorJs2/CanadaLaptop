import {forwardRef, Module} from '@nestjs/common';
import { PartModelsService } from './partmodels.service';
import { PartModelsController } from './partmodels.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {PartmodelModelSchema} from "../_schemas/partmodel/partmodel.schema";
import {AuthModule} from "../auth/auth.module";
import {PartmodelModel} from "../_types/partmodel/partmodel";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'partmodel',
        schema: PartmodelModelSchema,
        collection: 'part_models',
      },
    ],'MainDb'),
      PartmodelModel,
      forwardRef(() => AuthModule)
  ],
  providers: [PartModelsService],
  controllers: [PartModelsController]
})
export class PartmodelsModule {}
