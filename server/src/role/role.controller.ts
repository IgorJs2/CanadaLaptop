import {Body, Controller, Get, Post, Put, Query, UseGuards} from '@nestjs/common';
import {RoleService} from "./role.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Types} from "../auth/types-auth.decorator";
import {Permissions} from "../auth/permissions.decorator";
import {TypesGuard} from "../auth/types.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {PermissionsGuard} from "../auth/permissions.guard";


@Controller('role')
export class RoleController {
    constructor(private RoleService: RoleService) {
    }

    @UseGuards(JwtAuthGuard)
    @UseGuards(TypesGuard)
    @UseGuards(PermissionsGuard)
    @Types("Admin")
    @Permissions("Manage roles")
    @Get()
    get_roles() {
        return this.RoleService.get_roles()
    }


    @Get("info")
    get_role_info(@Query("role") role: string){
        return this.RoleService.get_role_info(role)
    }

    @Put()
    change_Role_status(@Query("RoleID") RoleID: string,
                             @Query("status") status: boolean){
        return this.RoleService.change_role_status(RoleID, status)
    }

    @Post("")
    create_Role(@Body() dto: CreateRoleDto ) {
        return this.RoleService.create_role(dto)
    }
}
