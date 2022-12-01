import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {PERMISSIONS_KEY} from "./permissions.decorator";


@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
                context.getHandler(),
                context.getClass(),
            ])[0]
            if (!requiredPermissions) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            if(!authHeader){
                throw new HttpException( 'Нет доступа', HttpStatus.FORBIDDEN)
            }
            const token = authHeader.split(' ')[1]


            const user = this.jwtService.verify(token);
            req.user = user;
            const permissionIsActive = user._role._permissions.some((object) => {
                if(requiredPermissions === object.permission && object.active){
                    return true
                }
                return false
            })
            if(permissionIsActive){
                return true
            }
            else throw Error()
            // return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            console.log(e)
            throw new HttpException( 'Нет доступа', HttpStatus.FORBIDDEN)
        }
    }

}