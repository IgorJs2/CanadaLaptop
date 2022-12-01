import {Body, Controller, Delete, Get, Post, Put, Query} from '@nestjs/common';
import {CreateInvoiceDto} from "./dto/create-invoice.dto";
import {TSettings} from "../_types/chat/settings";
import {InvoiceService} from "./invoice.service";

@Controller('invoice')
export class InvoiceController {

    constructor(private InvoiceService: InvoiceService) {

    }

    @Get()
    async get_invoices() {
        return await this.InvoiceService.get_invoices()
    }

    @Get("/info")
    async get_invoice(@Query("id") id: string) {
        return await this.InvoiceService.get_invoice(id)
    }

    @Post()
    async create_invoice(@Body() dto: CreateInvoiceDto ) {
        return await this.InvoiceService.create_invoice(dto)
    }


    @Put()
    async change_invoice(@Query("settings") settings: TSettings[],
                         @Query("invoiceId") invoiceId: string){
        return await this.InvoiceService.change_invoice(settings,invoiceId)
    }

    @Delete()
    async delete_invoice(@Query("invoiceId") invoiceId: string){
        return await this.InvoiceService.delete_invoice(invoiceId)
    }

}
