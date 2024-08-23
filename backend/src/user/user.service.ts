import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { CreateUser } from 'src/dto/create-user';
import { Response } from "../dto/response";
import *  as bcrypt from "bcrypt";

import { UpdateUser } from 'src/dto/update-user';


@Injectable()
export class UserService {

    constructor(private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService
    ) { }

    async register(creaeteUser: CreateUser): Promise<Response<CreateUser>> {

        const response = new Response<CreateUser>();
        const { password, role, username, email, status } = creaeteUser;


        try {

            const hashpassword = await bcrypt.hash(password, 10);

            console.log("hashpassword...", hashpassword);

            const [result] = await this.databaseService.callProcedure('createUser', [username, email, hashpassword, role, status])


            if (result) {
                response.data = result as CreateUser;
                response.status = true;
                response.message = "user register sucessfully"
            } else {
                response.status = false
                response.message = "something went wrong while register the user"
            }
            return response;

        } catch (error) {

            console.log(error, "error during registering user");
            response.status = false;

            response.message = "failsed to register user "

            return response

        }

    }


    async login(email: string, password: string): Promise<Response<{ email: string; token: string; userId: number; role: string; }>> {
        const response = new Response<{ email: string; token: string; userId: number; role: string;}>();

        try {
            const [result] = await this.databaseService.callProcedure("login", [email]);

            console.log(result);

            if (result.length > 0) {
                const user = result[0];
                const storedPassword = user.storedPassword; 

                const isPasswordValid = await bcrypt.compare(password, storedPassword);

                if (isPasswordValid) {
                    const { userId, email, role, } = user;
                    console.log("user...",userId)
                    const token = this.jwtService.sign(
                        { userId, email, role,  },
                        { secret: process.env.JWT_SECRET, expiresIn: '1h' }
                    );

                    response.data = { token, userId, email, role, };
                    response.message = "Login successful";
                    response.status = true;
                } else {
                    console.log("Invalid credentials");
                    response.message = "Invalid credentials";
                    response.status = false;
                }
            } else {
                console.log("User not found");
                response.message = "User not found";
                response.status = false;
            }
        } catch (error) {
            console.error("Error during login:", error);
            response.message = "Error occurred during login";
            response.status = false;
        }

        return response;
    }


    async getProfile(id: number): Promise<Response<CreateUser>> {

        const response = new Response<CreateUser>;
        try {

            const [result] = await this.databaseService.callProcedure('getProfile', [id]);

            if (result) {
                response.data = result;
                response.message = "profile retrived succesfully";
                response.status = true;

            } else {
                response.message = 'internal server error';
                response.status = false
            }

        } catch (error) {
            console.log(error, 'error is coming while retriving user info')
            response.message = "error coming while retriving user info";
            response.status = false
        }
        return response

    }

    async getAllUser(): Promise<Response<CreateUser[]>> {

        const response = new Response<CreateUser[]>()

        try {

            const [result] = await this.databaseService.callProcedure('getAllUser', []);
            if (result) {
                response.data = result as CreateUser[];
                response.message = "users sucessfully retrived";
                response.status = true


            } else {

                response.message = 'error while retriving data';
                response.status = false
            }



        } catch (error) {
            console.log(error, "error while getting users ")
            response.message = "while getting result error comes"
            response.status = false

        }

        return response


    }


     async updateUser(updateUser: UpdateUser): Promise<Response<UpdateUser>> {

        const response = new Response<UpdateUser>();
        const { userId, password, role, username, email } = updateUser;

        try {
            let hashpassword: string | undefined = password;
            if (password) {
                hashpassword = await bcrypt.hash(password, 10);
            }

            const [result] = await this.databaseService.callProcedure('updateUser', [
                userId,
                username,
                email,
                hashpassword,
                role,
                
            ]);

            if (result) {
                response.data = result as UpdateUser;
                response.status = true;
                response.message = "updated successfully";
            } else {
                response.status = false;
                response.message = "err while updating the user";
            }
            return response;

        } catch (error) {
            console.log(error, "error during updating user");
            response.status = false;
            response.message = "failed to update user";
            return response;
        }
    }

}

