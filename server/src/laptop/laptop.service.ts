import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateLaptopDto} from "./dto/create-Laptop.dto";
import {LaptopModel} from "../_types/laptop/laptop";
import {clearFilterObject} from "../laptopmodels/helpers/clearFilterObject";
import {Laptop} from "../_schemas/laptop/laptop.schema";
import {LaptopmodelListItem, LaptopmodelModel} from "../_types/laptopmodel/laptopmodel";

@Injectable()
export class LaptopService {
    constructor(
        @InjectModel('laptop') private readonly LaptopModel: Model<LaptopModel>,
    ) {
    }


    async getLaptops(count, offset ): Promise<LaptopModel[] | string> {
        try {
            const Laptops = await this.LaptopModel.find().skip(offset).limit(count).populate({path: "_createdBy", select: {_id: 0, full_name: 1}});
            return Laptops
        } catch (e) {
            return "Error when try to get Laptops please try again!"
        }
    }

    async getLaptopsById(id_array: string[]): Promise<LaptopModel[] | string> {
        try {
            const Laptops = await this.LaptopModel.find({ _id : { $in : id_array } })
            return Laptops
        } catch
            (e) {
            console.log(e)
            return "Error when try to get filtered Laptops please try again!"
        }
    }

    async getLaptopList(filters): Promise<LaptopModel[] | string> {
        try {
            const parsed_filters = JSON.parse(filters)
            const filter = await clearFilterObject({...parsed_filters})
            const Laptops = await this.LaptopModel.find(filter).select({_id: 1, searchID: 1, title: 1})
            return Laptops
        } catch
            (e) {
            console.log(e)
            return "Error when try to get filtered Laptops please try again!"
        }
    }

    async getFilteredLaptops(count, offset, type, filters): Promise<LaptopModel[] | string | any> {
        try {
            const parsed_filters = JSON.parse(filters)
            const filter = await clearFilterObject({...parsed_filters})
            const Laptops = await this.LaptopModel.find(filter).skip(offset).limit(count).populate({path: "_createdBy", select: {_id: 0, full_name: 1}});
            return Laptops
        } catch (e) {
            console.log(e)
            return "Error when try to get filtered Laptops please try again!"
        }
    }

    async deleteLaptop(id): Promise<string> {
        try {
            const Laptops = await this.LaptopModel.findOneAndDelete({ID: id})
            return "Successfully"
        } catch (e) {
            return "Error when try to delete the Laptop please try again!"
        }
    }

    async updateLaptop(): Promise<LaptopModel | string> {
        try {
            const Laptops = await this.LaptopModel.findOneAndUpdate();
            return Laptops
        } catch (e) {
            return "Error when try to update Laptop please try again!"
        }
    }

    async createLaptop(dto: CreateLaptopDto): Promise<LaptopModel | string> {
        try {
            const Laptops = await this.LaptopModel.create(dto);
            return Laptops
        } catch (e) {
            console.log(e)
            if(e && e.code === 11000) { // Duplicate field
                return "ID field must be unique!"
            }
            return "Error when try to create Laptop please try again!"
        }
    }

    async numbersOfDocument(filters): Promise<number | string> {
        try {
            const parsed_filters = JSON.parse(filters)
            const filter = await clearFilterObject({...parsed_filters})
            const numbersOfDocument = await this.LaptopModel.count(filter);
            return numbersOfDocument
        } catch (e) {
            console.log(e)
            return "Error when try to get numbers of page please try again!"
        }
    }

}
