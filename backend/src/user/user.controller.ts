import { CreateUser } from './../dto/create-user';
import { Controller, Post, Get, Param, Delete, Body, UseGuards, UploadedFile, UseInterceptors ,Put} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth-guard';
import { UpdateUser  } from 'src/dto/update-user';
import { RolesGuard } from 'src/auth/admin-guard';
import { Role } from 'src/decorators/role';

@Controller("users")

export class UserController {

    constructor(private readonly userService: UserService) { }


    @Post("register")
    async register(@Body() body: CreateUser) {

        return this.userService.register(body)

    }

    @Post("login")

    async login(@Body() body: { email: string, password: string }) {
        return await this.userService.login(body.email, body.password)
    }



@Put(':id')
@UseGuards(AuthGuard, RolesGuard)
    @Role("admin")
    async updateUser(@Param('id') id: number, @Body() body: UpdateUser) {
        return await this.userService.updateUser({ userId: id, ...body });
    }

    @Get(":id")
 @UseGuards(AuthGuard)
    async getProfile(@Param("id") id: number) {

        return await this.userService.getProfile(id)

    };

    @UseGuards(AuthGuard)
    @Get()
    async getAllUser() {
        return await this.userService.getAllUser()
    }


}