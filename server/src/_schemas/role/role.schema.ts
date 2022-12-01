import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type RoleModelDocument = Role & Document;

@Schema()
export class Role {
 
@Prop() 
 name: string 
 
@Prop([{type: mongoose.Schema.Types.ObjectId, ref: "permission"}] )
 _permissions: []
 
@Prop() 
 active: boolean 
}


export const RoleModelSchema = SchemaFactory.createForClass(Role);