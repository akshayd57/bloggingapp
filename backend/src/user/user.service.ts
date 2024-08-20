import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { CreateUser } from 'src/dto/create-user';
import { Response } from "../dto/response";
import *  as bcrypt from "bcrypt";


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


    async login(email: string, password: string): Promise<Response<{ email: string, token: string, userId: number, role: string, status: string }>> {

        const response = new Response<{ email: string; token: string; userId: number; role: string; status: string }>;

        try {
            const [result] = await this.databaseService.callProcedure("login", [email]);

            console.log(result)


            if (result) {

                const user = result;

                const storedpassword = user.passowrd;

                const ispassowrdvalid = await bcrypt.compare(password, storedpassword)

                if (ispassowrdvalid) {
                    const userId = user.id;
                    const role = user.role;
                    const email = user.email;

                    const status = user.status;

                    const token = this.jwtService.sign(
                        { userId, email, role, status },
                        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
                    );

                    response.data = { token, userId, role, email, status };

                    response.message = "Login Sucessfull";

                    response.status = true

                } else {

                    console.log("invalid credeantial")
                    response.message = "invalid credeantial"
                }

            } else {
                console.log("please check result");
                response.message = "error while getting result"
            }

        } catch (error) {

            console.log(error)
            response.message = "error ocuured while login"
        }
        return response
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

}
