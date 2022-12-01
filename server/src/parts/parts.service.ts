import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreatePartsDto} from "./dto/create-parts.dto";
import {PartModel} from "../_types/part/part";
import {clearFilterObject} from "../laptopmodels/helpers/clearFilterObject";



@Injectable()
export class PartsService {
    constructor(
        @InjectModel('part') private readonly Part: Model<PartModel>,
    ) {
    }


    async getParts(count, offset): Promise<PartModel[] | string> {
        try {
            const Parts = await this.Part.find().skip(offset).limit(count).populate({path: "_createdBy", select: {_id: 0, full_name: 1}});;
            return Parts
        } catch (e) {
            console.log(e)
            return "Error when try to get Partss please try again!"
        }
    }

    async getFiltredParts(count, offset, type, filters): Promise<PartModel[] | string> {
        try {
            const parsed_filters = JSON.parse(filters)
            const filter = await clearFilterObject({...parsed_filters})
            const Parts = await this.Part.find(filter).skip(offset).limit(count).populate({path: "_createdBy", select: {_id: 0, full_name: 1}});
            return Parts
        } catch (e) {
            console.log(e)
            return "Error when try to get filtered Partss please try again!"
        }
    }

    async deletePart(id): Promise<string> {
        try {
            const Parts = await this.Part.findOneAndDelete({ID: id})
            return "Successfully"
        } catch (e) {
            return "Error when try to delete the Parts please try again!"
        }
    }

    async updatePart(): Promise<PartModel | string> {
        try {
            const Parts = await this.Part.findOneAndUpdate();
            return Parts
        } catch (e) {
            return "Error when try to update Parts please try again!"
        }
    }

    async createPart(dto: CreatePartsDto): Promise<PartModel | string> {
        try {
            const check = await this.Part.findOne({ID: dto.ID})
            if(check) {
                return "ID field must be unique!"
            }
            //@ts-ignore
            console.log(dto.item_status)
            const Parts = await this.Part.create(dto);
            return Parts
        } catch (e) {
            console.log(e)
            if(e && e.code === 11000) {
                return "ID field must be unique!"
            }
            return "Error when try to create Parts please try again!"
        }
    }

    async numbersOfDocument(filters): Promise<number | string> {
        try {
            const parsed_filters = JSON.parse(filters)
            const filter = await clearFilterObject({...parsed_filters})
            const numbersOfDocument = await this.Part.count(filter);
            return numbersOfDocument
        } catch (e) {
            console.log(e)
            return "Error when try to get numbers of page please try again!"
        }
    }
}
