import { Injectable } from '@nestjs/common';
import {TSettings} from "../_types/chat/settings";
import {CreateInvoiceDto} from "./dto/create-invoice.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {InvoiceModel} from "../_types/invoice/invoice";

@Injectable()
export class InvoiceService {

    constructor(@InjectModel("invoice") private readonly InvoiceModel:Model<InvoiceModel>) {
    }

    async get_invoices(): Promise<InvoiceModel[]> {
        try {
            const data = await this.InvoiceModel.find().populate({path: "createdByUserId", select: {full_name: 1, _id: 1}})
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async get_invoice(id): Promise<InvoiceModel> {
        try {
            const data = await this.InvoiceModel.findOne({_id: id}).populate({path: "createdByUserId", select: {full_name: 1, _id: 1}})
            return data
        } catch (e) {
            console.log(e)
        }
    }

    async create_invoice(dto: CreateInvoiceDto): Promise<InvoiceModel | string> {
        try {
            const {to, createdByUserId, from, ebayList, title, price} = dto

            if(!to || !createdByUserId || !from || !ebayList || !title || !price){
                return "Incorrect data"
            }

            const newInvoice = await this.InvoiceModel.create(
                {
                    ...dto,
                    createdAt: Date.now()
                }
            )
            return await newInvoice.save()
        } catch (e) {
            console.log(e)
        }
    }

    async change_invoice(settings: TSettings[], invoiceId: string) {
        try {
            let invoice = await this.InvoiceModel.findOne({_id: invoiceId})

            if(!invoice) {
                return "Invoice not found"
            }

            for(let i = 0; i < settings.length; i++){
                invoice[settings[i].field] = settings[i].newValue
            }

            await invoice.save()

            return invoice

        } catch (e) {
            console.log(e)
        }
    }

    async delete_invoice(invoiceId: string): Promise<InvoiceModel | string> {
        try {
            let invoice = await this.InvoiceModel.findOneAndDelete({_id: invoiceId})

            if(!invoice) {
                return "Invoice not found"
            }

            return invoice

        } catch (e) {
            console.log(e)
        }
    }
}
