import { CreateUser } from './../dto/create-user';
import { Controller, Post, Get, Param, Delete, Body, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from '../dto/response';



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

    @Get(":id")



    async getProfile(@Param("id") id: number) {

        return await this.userService.getProfile(id)

    }

    @Get()

    async getAllUser() {
        return await this.userService.getAllUser()
    }


}