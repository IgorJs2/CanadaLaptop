import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {LaptopmodelListItem, LaptopmodelModel} from "../_types/laptopmodel/laptopmodel";
import {CreateLaptopModelsDto} from "../laptopModels/dto/create-Laptopmodels.dto";
import {TypeLaptopmodelsDto} from "./dto/type-Laptopmodels.dto";
import {clearFilterObject} from "./helpers/clearFilterObject";
import {clearEditObject} from "./helpers/clearEditObjects";

@Injectable()
export class LaptopModelsService {
    constructor(
        @InjectModel('laptopmodel') private readonly LaptopModelsModel: Model<LaptopmodelModel>,
    ) {
    }


    async getLaptopModels(count, offset): Promise<LaptopmodelModel[] | string> {
        try {
            const LaptopModels = await this.LaptopModelsModel.find().skip(offset).limit(count);
            return LaptopModels
        } catch (e) {
            return "Error when try to get LaptopModelss please try again!"
        }
    }

    async getLaptopModelsById(id_array: string[]): Promise<LaptopmodelModel[] | string> {
        try {
            const LaptopModels = await this.LaptopModelsModel.find({ _id : { $in : id_array } })
            return LaptopModels
        } catch
            (e) {
            console.log(e)
            return "Error when try to get filtered LaptopModelss please try again!"
        }
    }

    async getLaptopModelList(filters): Promise<LaptopmodelListItem[] | string> {
        try {
            const parsed_filters = JSON.parse(filters)
            const filter = await clearFilterObject({...parsed_filters})
            const LaptopModels = await this.LaptopModelsModel.find(filter).select({_id: 1, searchID: 1, name: 1})
            return LaptopModels
        } catch
            (e) {
            console.log(e)
            return "Error when try to get filtered LaptopModelss please try again!"
        }
    }

    async getFiltredLaptopModels(count, offset, type, filters): Promise<LaptopmodelModel[] | string | any> {
        try {
            const parsed_filters = JSON.parse(filters)
            const filter = await clearFilterObject({...parsed_filters})
            const LaptopModels = await this.LaptopModelsModel.find(filter).skip(offset).limit(count);
            return LaptopModels
        } catch
            (e) {
            console.log(e)
            return "Error when try to get filtered LaptopModelss please try again!"
        }
    }

    async deleteLaptopModel(id): Promise<string> {
        try {
            const LaptopModels = await this.LaptopModelsModel.findOneAndDelete({ID: id})
            return "Successfully"
        } catch (e) {
            return "Error when try to delete the LaptopModels please try again!"
        }
    }

    async updateLaptopModel(): Promise<LaptopmodelModel | string> {
        try {
            const LaptopModels = await this.LaptopModelsModel.findOneAndUpdate();
            return LaptopModels
        } catch (e) {
            return "Error when try to update LaptopModels please try again!"
        }
    }

    async createLaptopModel(dto: CreateLaptopModelsDto): Promise<LaptopmodelModel | string> {
        try {
            const LaptopModels = await this.LaptopModelsModel.create(dto);
            return LaptopModels
        } catch (e) {
            console.log(e)
            if (e && e.code === 11000) {
                return "ID field must be unique!"
            }
            return "Error when try to create LaptopModels please try again!"
        }
    }

    async getPriorityLaptopModels() {
        try {
            const allLaptopModel = await this.LaptopModelsModel.find({}, {
                _id: 1,
                amount_paid: 1,
                name: 1,
                profit: 1,
                moneybackdays: 1
            }).lean()

            //Most buyed

            const uniq = [...allLaptopModel].map((laptopmodel) => {
                return {count: 1, name: laptopmodel.name}
            }).reduce((a, b) => {
                a[b.name] = (a[b.name] || 0) + b.count
                return a
            }, {})

            const most_buyed = Object.keys(uniq).map((key) => {
                return {
                    model: key,
                    profit: 0,
                    quantity: 0,
                    count: uniq[key]
                }
            })

            //

            //Most profit

            const LaptopModelsWithQuantity = allLaptopModel.map((v) => {
                if (v.profit && v.amount_paid) {
                    return {
                        model: v.name,
                        profit: v.profit,
                        count: 0,
                        ["quantity"]: +(v.profit / v.amount_paid).toFixed(1)
                    }
                }
                return {_id: v._id, Model: v.name, Profit: v.profit, AmountPaid: v.amount_paid, ["quantity"]: 0}
            })
            const price_profit = LaptopModelsWithQuantity.sort((a, b) => {
                return (b.profit - a.profit)
            })

            //

            //Most quanity

            const LaptomModelsWithQuantity = allLaptopModel.map((v) => {
                if (Number(v.profit) && Number(v.amount_paid)) {
                    return {
                        model: v.name,
                        profit: v.profit,
                        count: 0,
                        ["quantity"]: +(v.profit / v.amount_paid).toFixed(1)
                    }
                }
                return {_id: v._id, Model: v.name, Profit: v.profit, AmountPaid: v.amount_paid, ["quantity"]: 0}
            })
            const price_quantity = LaptomModelsWithQuantity.sort((a, b) => {
                return (b.quantity - a.quantity)
            })

            //

            return Object.values({
                price_quantity: price_quantity.map((e: any & { best_category: string }) => {
                    return {...e, ["best_category"]: "Most quantity"}
                }),
                price_profit: price_profit.map((e: any & { best_category: string }) => {
                    return {...e, ["best_category"]: "Most profit"}
                }),
                most_buyed: most_buyed.map((e: any & { best_category: string }) => {
                    return {...e, ["best_category"]: "Most buyed"}
                })
            }).flat()
        } catch (e) {
            console.log(e)
            return "Error when try to get price/quantity laptops please try again!"
        }
    }


    async numbersOfDocument(filters): Promise<number | string> {
        try {
            const parsed_filters = JSON.parse(filters)
            const filter = await clearFilterObject({...parsed_filters})
            const numbersOfDocument = await this.LaptopModelsModel.count(filter);
            return numbersOfDocument
        } catch
            (e) {
            console.log(e)
            return "Error when try to get numbers of page please try again!"
        }
    }

    async editLaptopModelFromList(items: string): Promise<LaptopmodelModel[] | string> {
        try {
            const new_items = JSON.parse(items).map((e) => clearEditObject(e))

            if(!items){
                return "Not have items"
            }

            if(new_items.indexOf(false) > -1){
                return "Incorrect edit data"
            }

            const new_items_id_array = new_items.map((e) => e._id)
            const check_item_in_db = await this.LaptopModelsModel.find({ _id : { $in : new_items_id_array } }).lean()

            if(!check_item_in_db){
                return "Items incorrect"
            }

            const edited_items_array = check_item_in_db.map((item) => {
                for(let i = 0; i < new_items.length; i++){
                    if(new_items[i]._id === item._id.toString()){
                        return {...item, ...new_items[i]}
                    }
                }
            })

            for(let i = 0; i < edited_items_array.length; i++){
                //TODO: Make here validations for edited_array and if it have problem return error
                const for_replace_item = Object.assign({}, {...edited_items_array[i]})
                delete for_replace_item._id;
                await this.LaptopModelsModel.findOneAndReplace({_id: edited_items_array[i]._id}, {...for_replace_item})
            }

            return edited_items_array

        } catch
            (e) {
            console.log(e)
            return "Error when try to get numbers of page please try again!"
        }
    }
}
