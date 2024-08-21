import { Response } from './../dto/response';
import { CreatePost } from './../dto/create-post';
import { DatabaseService } from './../database/database.service';
import { S3Service } from './../services/s3.service';
import { Injectable } from '@nestjs/common';
import { UpdatePost } from 'src/dto/update-post';



@Injectable()
export class PostsService {
    constructor(private readonly s3Service: S3Service,
        private readonly databaseService: DatabaseService
    ) { }

    async CreatePost(createPost: CreatePost): Promise<Response<CreatePost>> {

        const response = new Response<CreatePost>();
        let image_url: string = " ";

        const { userId, title, content, category, image } = createPost;

        try {
            if (image) {
                image_url = await this.s3Service.uploadFile(image)
            }

            const [result] = await this.databaseService.callProcedure("createPost", [userId, title, content, category, image_url])
            if (result && result.length > 0) {

                response.message = "post created sucessfully";
                response.status = true;
                response.data = result as CreatePost
            } else {
                console.log("not get a result");
                response.message = "not a get result";
                response.status = false
            }
        } catch (error) {

            console.log(error, "error comes while cretaing post");

            response.message = "error comes while creating post"
            response.status = false


        }
        return response

    }


    async updatePost(userId: number, updatepost: UpdatePost): Promise<Response<UpdatePost>> {
        const response = new Response<UpdatePost>();
        try {

            const field = Object.keys(updatepost).filter(key => updatepost[key] !== undefined && updatepost[key] !== '')

            const values = field.map(key => updatepost[key]);

            if (field.length == 0) {
                response.message = "No filds to upate";

                return response

            }

            const result = await this.databaseService.callProcedure('Updateuser', [userId, ...values]);

            if (result && result.length > 0) {

                response.data = result as UpdatePost;
                response.status = true,
                    response.message = "User Updated Successfully"
            } else {
                response.message = "error comes while updating user";

            }

        } catch (error) {

            console.log(error, "error comes while updating user");
        }

        return response
    }


    async getAllPost(): Promise<Response<CreatePost>> {

        const response = new Response<CreatePost>();

        try {

            const result = await this.databaseService.callProcedure('getAllPost', [])

            if (result && result.length > 0) {

                response.data = result as CreatePost;
                response.message = "All post Retrived sucesfully";
                response.status = true


            } else {
                response.message = "error comes while retriving post";
                response.status = false

            }

        } catch (error) {
            console.log(error, "error comes while retriving post");
            response.message = "error comes while retriving post";
            response.status = false;


        }
        return response


    }

    async getPostById(id: number): Promise<Response<CreatePost>> {

        const response = new Response<CreatePost>;

        try {
            const result = await this.databaseService.callProcedure('getPostById', [id]);

            if (result && result.length > 0) {
                response.message = "retrived post succesfully";
                response.data = result;
                response.status = true

            } else {

                response.message = "not getting post"
                response.status = false
            }


        } catch (error) {
            console.log(error);

            response.status = false;
            response.message = "while retriving get error"
        }

        return response;

    }



}
