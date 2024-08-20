import { CreatePost } from './../dto/create-post';
import { DatabaseService } from './../database/database.service';
import { S3Service } from './../services/s3.service';
import { Injectable } from '@nestjs/common';
import { Response } from 'src/dto/response';
import { CreateUser } from 'src/dto/create-user';


@Injectable()
export class PostsService {
    constructor(private readonly s3Service: S3Service,
        private readonly databaseService: DatabaseService
    ) { }

    async CreatePost(createPost: CreatePost): Promise<Response<CreatePost>> {

        const response = new Response<CreatePost>();

        const { userId, title, content, category, image_url } = createPost
        try {

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

}
