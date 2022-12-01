import mongoose from "mongoose";

export class CreateBoardTaskDto{
    created_by: mongoose.Schema.Types.ObjectId
    task: string
    decription: string
    status: string
    from: string
    to: string
}