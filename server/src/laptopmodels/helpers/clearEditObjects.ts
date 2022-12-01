import {isNumber} from "@nestjs/common/utils/shared.utils";
import {isObjectIdOrHexString} from "mongoose";

export const clearEditObject = (edit: any) => {
    Object.keys(edit).map((key) => {
        if (edit[key] === "") {
            delete edit[key]
        }
        else if (["profit", "amount_paid", "price"].includes(key)) {
            edit[key] = +edit[key]
            if(isNaN(edit[key])){
                return false
            }
            return edit[key]
        }
        else if (key === "defects") {
            return edit[key] = [edit[key]]
        }
        else return edit[key]
    })

    if(Object.values(edit).includes(NaN))
    {
        return false
    }
    return edit
    if (!edit) {
        return false
    }
}