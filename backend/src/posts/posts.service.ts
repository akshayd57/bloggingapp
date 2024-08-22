import { Response } from './../dto/response';
import { CreatePost } from './../dto/create-post';
import { DatabaseService } from './../database/database.service';
import { S3Service } from './../services/s3.service';
import { Injectable } from '@nestjs/common';
import { UpdatePost } from 'src/dto/update-post';
import { String } from 'aws-sdk/clients/acm';



@Injectable()
export class PostsService {
    constructor(private readonly s3Service: S3Service,
        private readonly databaseService: DatabaseService
    ) { }

    async CreatePost(createPost: CreatePost): Promise<Response<CreatePost>> {

        const response = new Response<CreatePost>();
        let image_url: string = " ";

        const { userId,title, content, category, image } = createPost;

        try {
            if (image) {
                image_url = await this.s3Service.uploadImage(image)
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

async updatePost(postId: number, userId: number, updatePost: UpdatePost): Promise<Response<UpdatePost>> {
    const response = new Response<UpdatePost>();
    try {
        console.log("update...", postId, userId, updatePost);

        const values = [
            updatePost.title || null,
            updatePost.category || null,
            updatePost.content || null,
            updatePost.image_url || null
        ];

        console.log("...values", values);

        
        const [result] = await this.databaseService.callProcedure('UpdatePost', [postId, userId, ...values]);

        console.log("final", result);

        
        if (result && result.length > 0) {
            response.data = result as UpdatePost;
            response.status = true;
            response.message = "Post updated successfully";
        } else {
            response.message = "Failed to update post";
            response.status = false;
        }
    } catch (error) {
        console.error("Error occurred while updating post:", error);
        response.message = "Error occurred while updating post";
        response.status = false;
    }

    return response;
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
            console.log("result", result);
            

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

    async deletePost(id: number): Promise<Response<{ title: string }>> {
    const response = new Response<{ title: string }>();
    
    try {
    
        const [result] = await this.databaseService.callProcedure("deletePost", [id]);

        console.log("..result",result)
        
        
        if (result> 0) {
            
            const title = result[0].title; 

            console.log("title",title)
            
            response.message = "deleted successfully";
            response.data = { title }; 
            response.status = true;
        } else {
            
            response.status = false;
        }
    } catch (error) {
        console.log(error, "error occurred while deleting post");
        response.message = "Something went wrong";
        response.status = false;
    }
    
    return response;
}


}
