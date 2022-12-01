import mongoose from "mongoose";

export class SetPermissionDto {
    role: string;
    permission: mongoose.Schema.Types.ObjectId
}