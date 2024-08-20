import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

        console.log("Required roles......", requiredRoles);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        console.log(".....User", user);


        if (typeof user.role === 'string') {
            return requiredRoles.includes(user.role);
        }

        return user && user.roles && requiredRoles.some(role => user.roles.includes(role));
    }
}
