import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ChatModelSchema} from "../_schemas/chat/chat.schema";
import {InvoiceModelSchema} from "../_schemas/invoice/invoice.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'invoice',
        schema: InvoiceModelSchema,
        collection: 'invoices',

      },
    ],'MainDb'),
  ],
  providers: [InvoiceService],
  controllers: [InvoiceController]
})
export class InvoiceModule {}
