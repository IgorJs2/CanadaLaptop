import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type PermissionModelDocument = Permission & Document;

@Schema()
export class Permission {

@Prop() 
 permission: string 
 
@Prop() 
 active: boolean 
}


export const PermissionModelSchema = SchemaFactory.createForClass(Permission);