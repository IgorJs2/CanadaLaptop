const models = require("./models.json")
const fs = require("fs")

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});


let filtered = models.map((e) => {
    if(e["Текстовая область 1"].includes("ER-диаграмма")){
        return  undefined
    }
    return e
})

filtered = filtered.filter(function( element ) {
    return element !== undefined;
});

filtered = filtered.map((e) => {

    if(e["Текстовая область 1"]) {
        let value = ""

        for(let i = 0; i < 35; i++){
            if(i % 2 === 0){
                if(e[`Текстовая область ${i}`]){
                   if(e[`Текстовая область ${i+1}`].match(new RegExp("objectid", "i")) && e[`Текстовая область ${i+1}`] !== "_id"){
                        value += ` \n${e[`Текстовая область ${i}`] + ": " + "mongoose.Schema.Types.ObjectId"} \n`
                    }
                    else if(e[`Текстовая область ${i+1}`] !== "_id"){
                        value += ` \n${e[`Текстовая область ${i}`] + ": " + e[`Текстовая область ${i+1}`]} \n`
                    }
                }
            }
        }
        return {
            field: e["Текстовая область 1"],
            value,
        }
    }
    return undefined
})

filtered = filtered.filter(function( element ) {
    return element !== undefined;
});

filtered = filtered.map((e) => {
    if(e.value){
        return {
            field: e.field,
            value: e.value.replace("\n", "")
        }
    }
})




filtered.forEach((e, i) => {
    const name = e.field.toLowerCase()
    const props = "";
    if(!fs.existsSync(name)){
        fs.mkdir(name, (e) => {
            if(e) {
                console.log(e)
            }
        })
    }

    const NamedByRules = name.capitalize().replace("_", "")

    const ts =
        "import * as mongoose from \"mongoose\";\n\n" +
        `export class ${NamedByRules}Model {\n\n` +
            e.value +
        "\n}"

        fs.writeFile(`${name}/${name}.ts`, ts, function(err) {
            if (err) {
                console.log(err);
            }
        });
})

// const ts = "import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';\n" +
//     "import {Document} from 'mongoose';\n" +
//     "import * as mongoose from \"mongoose\";\n" +
//     "\n" +
//     "export type InvoiceModelDocument = InvoiceModel & Document;\n" +
//     "\n" +
//     "@Schema()\n" +
//     `export class ${filtered[0].field}Model {\n` +
//     "    @Prop() from: string\n" +
//     "\n" +
//     "    @Prop() to: string\n" +
//     "\n" +
//     "    @Prop() title: string\n" +
//     "\n" +
//     "    @Prop() ebayList: string\n" +
//     "\n" +
//     "    @Prop() price: number\n" +
//     "\n" +
//     "    @Prop() createdByUserId: {type: mongoose.Schema.Types.ObjectId, ref: \"user\"}\n" +
//     "\n" +
//     "    @Prop() createdAt: string\n" +
//     "}\n" +
//     "\n" +
//     "\n" +
//     `export const ${filtered[0].field}ModelSchema = SchemaFactory.createForClass(${filtered[0].field}Model);`
//

//
// fs.writeFile("test.ts", ts, function(err) {
//     if (err) {
//         console.log(err);
//     }
// });