import {isNumber} from "@nestjs/common/utils/shared.utils";
import {isObjectIdOrHexString} from "mongoose";

export const clearFilterObject = (filter: any) => {
    return new Promise((resolve, reject) => {
        delete filter.count
        delete filter.offset
        delete filter.type

        if (!Object.keys(filter)[0]) {
            resolve({});
        }

        if (filter.search !== "") {
            const searchString = filter.search
            delete filter.search

            const query_or_array = Object.keys(filter).map((key) => {
                if (!["profit", "amount_paid", "price", "moneybackdays", "item_status", "daysfrompaym", "_createdBy"].includes(key)) {
                    return {[key]: {$regex: new RegExp(searchString, "i")}}
                }
            }).filter((e) => e ? 1 : 0)

            resolve({$or: query_or_array})
        }
        Object.keys(filter).map((key) => {
            if (filter[key] === "" || filter[key] === "0" || filter[key] === 0) {
                delete filter[key]
            } else {
                if (!isNaN(+filter[key])) {
                    filter[key] = +filter[key]
                    return;
                }
                if (isObjectIdOrHexString(filter[key])) {
                    return;
                }
                if (["profit", "amount_paid", "price", "moneybackdays", "daysfrompaym"].includes(key)) {
                    if (filter[key].includes(">")) {
                        filter[key] = {$gt: Number(filter[key].split(">")[1])}
                        return;
                    }
                    if (filter[key].includes("<")) {
                        filter[key] = {$lt: Number(filter[key].split("<")[1])}
                        return;
                    }
                    if (filter[key].includes("-")) {
                        filter[key] = {$gt: Number(filter[key].split("-")[0]), $lt: Number(filter[key].split("-")[1])}
                        return;
                    }
                }
                if (key === "defects") {
                    filter[key] = {$elemMatch: {$in: filter[key]}}
                    return;
                }
                if (key === "_createdAt") {
                    const date = new Date(filter[key]);
                    if (!date) {
                        filter[key] = {$regex: new RegExp(filter[key], "i")}
                    }
                    filter[key] = {$regex: new RegExp(date.getTime().toString(), "i")}
                    return;
                }
                filter[key] = {$regex: new RegExp(filter[key], "i")}
            }
        })
        resolve(filter)
        if (!filter) {
            reject("Filter not found")
        }
    })
}