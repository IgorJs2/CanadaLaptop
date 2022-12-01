import {Body, Controller, Get, Param, Post, Query, Request, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {PermissionsGuard} from "../auth/permissions.guard";
import {Permissions} from "../auth/permissions.decorator";
import {UserModel} from "../_types/user/user";

@Controller('user')
export class UserController {

    constructor(private UserService: UserService) {
    }

    @Post()
    create(@Body() dto: CreateUserDto){
        return this.UserService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers(@Query("query") query: string ) {
        return this.UserService.getUsers(query)
    }
}
