import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";


@Global()

@Module({

    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET,
        global: true
    })],
    exports: [],
    providers: []
})

export class AuthModule { }