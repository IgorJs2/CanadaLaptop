import {forwardRef, Module} from '@nestjs/common';
import { LaptopModelsService } from './Laptopmodels.service';
import { LaptopModelsController } from './Laptopmodels.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "../auth/auth.module";
import {Laptopmodel, LaptopmodelModelSchema} from "../_schemas/laptopmodel/laptopmodel.schema";
import {LaptopmodelModel} from "../_types/laptopmodel/laptopmodel";
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'laptopmodel',
        schema: LaptopmodelModelSchema,
        collection: 'laptopmodels',
      },
    ],'MainDb'),
      LaptopmodelModel,
    forwardRef(() => AuthModule),
  ],
  providers: [LaptopModelsService],
  controllers: [LaptopModelsController]
})
export class LaptopmodelsModule {}
