import {isAnLaptopModel} from "../types/laptopmodel";
import {item_types} from "../constants/global_const";
import {isAnLaptop} from "../types/laptop";
import {isAnPart} from "../types/parts";
import {isAnPartModel} from "../types/partsmodel";

export const getObjectTypeName = <T>(object: T) => {
    const isLaptopModel = isAnLaptopModel(object)
    const isLaptop = isAnLaptop(object)
    const isPart = isAnPart(object)
    const isPartModel = isAnPartModel(object)

    if(isLaptopModel){
        return item_types.LaptopModel
    }
    if(isLaptop){
        return item_types.Laptop
    }
    if(isPart){
        return item_types.Part
    }
    if(isPartModel){
        return item_types.PartModel
    }

    return ""

}