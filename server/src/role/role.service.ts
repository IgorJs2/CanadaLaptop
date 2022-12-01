import { Injectable } from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {RoleModel} from "../_types/role/role";

@Injectable()
export class RoleService {
/*    set_role(dto: SetRoleDto) {

    }*/
    constructor(@InjectModel('role') private readonly RoleModel:Model<RoleModel>) {
    }

    async get_roles() {
        const roles = await this.RoleModel.find().populate({path: "_permissions"})
        return roles
    }

    async get_role_info(id: string) {
        const role = await this.RoleModel.findOne({_id: id})
        return role
    }

    async change_role_status(RoleID: string, status: boolean) {

    }

    async create_role(dto: CreateRoleDto) {

    }
}
