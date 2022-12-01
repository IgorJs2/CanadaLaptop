import { Injectable } from '@nestjs/common';
import {SetPermissionDto} from "./dto/set-permission.dto";
import {InjectModel} from "@nestjs/mongoose";
import {PermissionModel} from "../_types/permission/permission";
import {Model} from "mongoose";
import {RoleModel} from "../_types/role/role";
import {CreatePermissionDto} from "./dto/create-permission.dto";

@Injectable()
export class PermissionService {

    constructor(@InjectModel('permission') private readonly PermissionModel:Model<PermissionModel>,
                @InjectModel('role') private readonly RoleModel:Model<RoleModel>) {
    }

    async get_permissions(): Promise<PermissionModel[]> {
        return await this.PermissionModel.find()
    }

    async set_permission(dto: SetPermissionDto): Promise<PermissionModel | string> {
        try {
            const {role, permission} = dto
            let role_check = await this.RoleModel.findOne({name: role})

            if(!role_check) {
                return "Role not found"
            }

            const permission_check = await this.PermissionModel.findOne({_id: permission})

            if(!permission_check) {
                return "Permission not found"
            }

            // @ts-ignore
            role_check._permissions.push(permission_check._id)

            await role_check.save()

        } catch (e) {
            console.log(e)
            return "Server error"
        }
    }

    async get_role_permission(role: string): Promise<PermissionModel[] | string> {
        try {
            let role_check = await this.RoleModel.findOne({name: role})

            if(!role_check) {
                return "Role not found"
            }

            await role_check.populate({path: "_permissions"})
            // @ts-ignore
            return role_check

        } catch (e) {
            console.log(e)
            return "Server error"
        }
    }

    async change_permission_status(permissionID: string, status: boolean): Promise<PermissionModel | string> {
        try {
            let permission_check = await this.PermissionModel.findOne({_id: permissionID})

            if(!permission_check) {
                return "Permission not found"
            }

            permission_check.active = status

            return await permission_check.save()

        } catch (e) {
            console.log(e)
            return "Server error"
        }
    }

    async create_permission(dto: CreatePermissionDto) {
        const {permission} = dto
        return await this.PermissionModel.create({
            permission,
            active: true
        })
    }
}
