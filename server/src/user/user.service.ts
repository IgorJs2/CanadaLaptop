import {Get, Injectable, Post} from '@nestjs/common';
import {InjectModel, Prop} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";
import * as bcrypt from "bcrypt"
import {User} from "../_schemas/user/user.schema";
import {UserModel} from "../_types/user/user";
import * as mongoose from "mongoose";
import {RoleModel} from "../_types/role/role";

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly UserModel:Model<UserModel>,
                @InjectModel('role') private readonly RoleModel:Model<RoleModel>) {
    }

    async create(dto: CreateUserDto): Promise<UserModel | object | string> {
        const password = await bcrypt.hash(dto.password, 4)
        const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let errors = []
        let fields = []

        const Users = await this.UserModel.find({$or: [{login: dto.login}]})

        if (Users[0]) {
            errors.push("USER:This user already registered")
            fields.push("User")
        }
        if (dto.login.length < 5) {
            errors.push("LOGIN:Login must have more than 5 symbols")
            fields.push("Login")
        }
        if (dto.password.length < 5) {
            errors.push("PASSWORD:Password must have more than 5 symbols")
            fields.push("Password")
        }
        if (!regexMail.test(dto.email) && dto.email !== "none") {
            errors.push("EMAIL:Invalid email")
            fields.push("Email")
        }

        if (errors[0]) {
            return {errors, fields}
        }

        const role_check = await this.RoleModel.findOne({name: dto._role})

        if(!role_check){
            return "Role not find";
        }
        const time: Array<mongoose.Schema.Types.ObjectId> = []
        const logs: Array<mongoose.Schema.Types.ObjectId> = []

        const user = await this.UserModel.create({
            login: dto.login,
            full_name: dto.full_name,
            type: dto.type,
            mobild: dto.mobile,
            email: dto.email,
            password,
            _role: role_check._id,
            _time: time,
            _logs: logs,
        })
        return user
    }

    async findUser(username: string): Promise<UserModel> {
        const user = await this.UserModel.findOne({login: username}).populate({path: "_role", populate: {path: "_permissions"}}).lean()
        return user
    }

    async getUsers(query: string): Promise<UserModel[]>{
        const parsed_query = JSON.parse(query)
        const user = await this.UserModel.find(parsed_query).populate("_role", { _id: 0, name: 1})
        return user
    }
}
