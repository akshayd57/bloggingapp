import { PostsService } from './posts.service';
import { Controller, Post, Get, Param, Body } from '@nestjs/common';

import { CreatePost } from 'src/dto/create-post';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) { }


    @Post()

    async CreatePost(@Body() body: CreatePost) {

        return await this.postsService.CreatePost(body)



    }







}
