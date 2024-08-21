import { DatabaseService } from './../database/database.service';
import { UpdatePost } from 'src/dto/update-post';
import { PostsService } from './posts.service';
import { Controller, Post, Get, Param, Body, UploadedFile, Request } from '@nestjs/common';

import { UploadImage } from 'src/decorators/uploadImage';

import { CreatePost } from 'src/dto/create-post';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService

    ) { }


    @Post()
    @UploadImage(2 * 1024 * 1024, ['image/jpeg', 'image/png'])  
    async createPost(
        @Request() req,
        @Body() body: CreatePost,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const userId = req.user.id;

        console.log("...userId",userId)
        return this.postsService.CreatePost({ ...body,userId, image: file });
    }


    @Post("update/:id")

    async UpdatePost(@Param("id") id: number, @Body() body: UpdatePost) {
        return await this.postsService.updatePost(id, body)

    }


    @Get()


    async getAllPost() {
        return await this.postsService.getAllPost();

    }



    @Get(":id")

    async getPostById(@Param("id") id: number) {
        return await this.getPostById(id)
    }


}
