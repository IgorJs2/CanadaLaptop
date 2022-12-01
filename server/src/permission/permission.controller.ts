import {Body, Controller, Get, Post, Put, Query} from '@nestjs/common';
import {SetPermissionDto} from "./dto/set-permission.dto";
import {PermissionService} from "./permission.service";
import {CreatePermissionDto} from "./dto/create-permission.dto";

@Controller('permission')
export class PermissionController {
    constructor(private PermissionService: PermissionService) {
    }

    @Get()
    get_permissions() {
        return this.PermissionService.get_permissions()
    }

    @Post()
    set_permission(@Body() dto: SetPermissionDto ) {
        return this.PermissionService.set_permission(dto)
    }

    @Get("role")
    get_role_permission(@Query("role") role: string){
        return this.PermissionService.get_role_permission(role)
    }

    @Put()
    change_permission_status(@Query("permissionID") permissionID: string,
                             @Query("status") status: boolean){
        return this.PermissionService.change_permission_status(permissionID, status)
    }

    @Post("test")
    create_permission(@Body() dto: CreatePermissionDto ) {
        return this.PermissionService.create_permission(dto)
    }

}
