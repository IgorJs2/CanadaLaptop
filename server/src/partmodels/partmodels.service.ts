import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreatePartsModelsDto} from "./dto/create-partmodels.dto";
import {GetPartModelsDto, ProfitByModelPartModelsDto} from "./dto/custom-partmodels.dto";
import {PartmodelModel} from "../_types/partmodel/partmodel";
import {clearFilterObject} from "../laptopmodels/helpers/clearFilterObject";
import {LaptopmodelListItem, LaptopmodelModel} from "../_types/laptopmodel/laptopmodel";

@Injectable()
export class PartModelsService {
    constructor(
        @InjectModel('partmodel') private readonly PartsModelsModel: Model<PartmodelModel>,
    ) {
    }

    async getPartsModels(count, offset): Promise<GetPartModelsDto[] | string> {
        try {
            const PartsModels = await this.PartsModelsModel.find().skip(offset).limit(count).populate({path: "_laptop_model_id", select: {_id: 0, searchID: 1}});
            //@ts-ignore
            return PartsModels
        } catch (e) {
            return "Error when try to get Parts Models please try again!"
        }
    }

    async getPartModelsById(id_array: string[]): Promise<PartmodelModel[] | string> {
        try {
            const PartModels = await this.PartsModelsModel.find({ _id : { $in : id_array } })
            return PartModels
        } catch
            (e) {
            console.log(e)
            return "Error when try to get filtered PartModelss please try again!"
        }
    }

    async getPartModelList(filters): Promise<PartmodelModel[] | string> {
        try {
            const parsed_filters = JSON.parse(filters)
            const filter = await clearFilterObject({...parsed_filters})
            const PartModels = await this.PartsModelsModel.find(filter).select({_id: 1, searchID: 1, name: 1})
            return PartModels
        } catch
            (e) {
            console.log(e)
            return "Error when try to get filtered PartModelss please try again!"
        }
    }

    async getFiltredPartsModels(count, offset, type, filters): Promise<PartmodelModel[] | string> {
        try {
            const parsed_filters = JSON.parse(filters)
            const filter = await clearFilterObject({...parsed_filters})
            const PartsModels = await this.PartsModelsModel.find(filter).skip(offset).limit(count).populate({path: "_laptop_model_id", select: {_id: 0, searchID: 1}});
            return PartsModels
        } catch (e) {
            return "Error when try to get filtered PartsModelss please try again!"
        }
    }

    async deletePartsModel(id): Promise<string> {
        try {
            const PartsModels = await this.PartsModelsModel.findOneAndDelete({ID: id})
            return "Successfully"
        } catch (e) {
            return "Error when try to delete the PartsModels please try again!"
        }
    }

    async updatePartsModel(): Promise<PartmodelModel | string> {
        try {
            const PartsModels = await this.PartsModelsModel.findOneAndUpdate();
            return PartsModels
        } catch (e) {
            return "Error when try to update PartsModels please try again!"
        }
    }

    async createPartsModel(dto: CreatePartsModelsDto): Promise<PartmodelModel | string> {
        try {
            const PartsModels = await this.PartsModelsModel.create(dto);
            return PartsModels
        } catch (e) {
            console.log(e)
            if (e && e.code === 11000) {
                return "ID field must be unique!"
            }
            return "Error when try to create PartsModels please try again!"
        }
    }

    async getProfitByModel(model: string): Promise<ProfitByModelPartModelsDto[] | string> {
        try {
            return ""
            const parts = await this.PartsModelsModel.find({Model: {$regex: new RegExp(model, "i")} }, {
                _id: 1, ID: 1, Model: 1, Part: 1, CategoryDescr: 1, Price: 1, PicURL1:1, PicURL2:1, PicURL3:1, PicURL4:1, Part_Number: 1, MPN: 1,
            })
            //@ts-ignore
            // const clearedArray: ProfitByModelPartModelsDto[] = parts.map((model) => {
            //     let newModel = {}
            //     let img = []
            //     for (let key in model) {
            //         if (key.includes("PicURL")) {
            //             if (model[key] && model[key].includes('http')) {
            //                 img.push(model[key])
            //             }
            //         }
            //     }
            //     newModel = {
            //         _id: model._id,
            //         img,
            //         ID: model.ID,
            //         Model: model.Model,
            //         Price: model.Price,
            //         CategoryDescr: model.CategoryDescr,
            //         Part_Number: model.Part_Number,
            //         MPN: model.Part_Number,
            //     }
            //     return newModel
            // })
            // return clearedArray
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
            const numbersOfDocument = await this.PartsModelsModel.count(filter);
            return numbersOfDocument
        } catch (e) {
            console.log(e)
            return "Error when try to get numbers of page please try again!"
        }
    }
}
