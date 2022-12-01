import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import {UserModel} from "../_types/user/user";

@Injectable()
export class AuthService {
    constructor(private UserService: UserService, private jwtService: JwtService) {
    }

    async validateUser(username: string, pass: string): Promise<UserModel | string>{
        const user = await this.UserService.findUser(username)
        if(!user){
            return "User not found"
        }
        //@ts-ignore
        const passwordCheck = await bcrypt.compare(pass, user.password)
        if(user && passwordCheck){
            //@ts-ignore
            return {...user}
        }

    }

    async login(user: UserModel) {
        const payload = { ...user };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
