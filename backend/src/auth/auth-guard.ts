import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            console.log("no token provided")
            throw new UnauthorizedException("No token provided")
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            console.log("invalid token format")
            throw new UnauthorizedException('invalid token fromat')

        }

        const [schema, token] = parts;

        if (schema !== "Bearer" || !token) {
            console.log("invalid token format")

            throw new UnauthorizedException("ivalid token format")

        }


        try {

            const decoded = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            })

            request.user = decoded;
            

            
            return true
        } catch (error) {

            console.log(error, "something went wrong");
            throw new UnauthorizedException("invalid token");


        }





    }


}