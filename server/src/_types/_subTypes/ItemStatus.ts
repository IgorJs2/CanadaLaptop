import * as mongoose from "mongoose";

export type TItemStatus = {
    color: string;
    number: number,
    value: string,
}

export class ItemStatus extends mongoose.SchemaType {
    constructor(key, options) {
        super(key, options, 'ItemStatus');
    }

    cast(val) {
        let _val = val.color && val.number && val.value;
        if (isNaN(_val)) {
            throw new Error('ItemStatus: ' + val + ' is not a object');
        }
        return _val;
    }
}
