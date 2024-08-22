    import { DatabaseService } from 'src/database/database.service';

    import { UpdatePost } from 'src/dto/update-post';
    import { PostsService } from './posts.service';
    import { Controller, Post, Get, Param, Body, UploadedFile, Request, UseGuards,Delete,Res, Put} from '@nestjs/common';

    import { UploadImage } from 'src/decorators/uploadImage';

    import { CreatePost } from 'src/dto/create-post';
    import { AuthGuard } from 'src/auth/auth-guard';
    import { S3Service } from 'src/services/s3.service';
    import { RolesGuard } from 'src/auth/admin-guard';
    import { Role } from 'src/decorators/role';

    @Controller('users/post')
    export class PostsController {

        constructor(private readonly postsService: PostsService,
            private readonly s3Service: S3Service,

        ) { }


        @Post()
        @UseGuards(AuthGuard)
        @UploadImage(2 * 1024 * 1024, ['image/jpeg', 'image/png'])  
        async createPost(
            @Request() req,
            @Body() body: CreatePost,
            @UploadedFile() file: Express.Multer.File,
        ) {
            const userId = req.user.userId;

    console.log("title",body.title,)
            console.log("...userId",userId)
            return this.postsService.CreatePost({ ...body,userId, image: file });
        }


        @Put('/update/:id')
        @UseGuards(AuthGuard)
        
    @UploadImage(2 * 1024 * 1024, ['image/jpeg', 'image/png'])  
        
        async updatePost(
            @Param('id') id: number,
            @Body() body: UpdatePost,
            @UploadedFile() file: Express.Multer.File,
            @Request() req,
        ) {
            const userId = req.user.userId;;

            console.log("userId", userId);

            console.log("file..", file);




            if (file) {
        body.image_url=await this.s3Service.uploadImage(file)
    }
            console.log(".....body", body);



            return await this.postsService.updatePost( id, userId, body, );
        }



        @Get('/all')
        @UseGuards(AuthGuard, RolesGuard)
            @Role('admin')

        async getAllPost() {
            return await this.postsService.getAllPost();
        }



        @Get(":id")
            @UseGuards(AuthGuard)

        async getPostById(@Param("id") id: number) {
            return await this.postsService.getPostById(id)

        }
        

        @Delete(':id')
        @UseGuards(AuthGuard, RolesGuard)
            @Role("admin")

        async deletePost(@Param('id') id: number,) {
            

                return await this.postsService.deletePost(id);
            
            
        }
    }
