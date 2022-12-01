import mongoose from "mongoose";

export class CreateMailDto {
    from: string
    message: string
    to: string
    short_name: string
    date: string
}