import {forwardRef, Module} from '@nestjs/common';
import { LaptopService } from './Laptop.service';
import { LaptopController } from './Laptop.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {LaptopModelSchema} from "../_schemas/laptop/laptop.schema";
import {AuthModule} from "../auth/auth.module";
import {LaptopModel} from "../_types/laptop/laptop";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'laptop',
        schema: LaptopModelSchema,
        collection: 'laptops',

      },
    ],'MainDb'),
    LaptopModel,
    forwardRef(() => AuthModule),
  ],
  providers: [LaptopService],
  controllers: [LaptopController],
})
export class LaptopModule {}
