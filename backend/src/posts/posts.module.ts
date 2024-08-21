import { S3ConfigService } from '../config/s3configservice';

import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { S3Service } from 'src/services/s3.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';


@Module({

    imports: [ConfigModule.forRoot()],
    exports: [],
    providers: [S3Service, PostsService, S3ConfigService, DatabaseService],
    controllers: [PostsController]
})
export class PostsModule { }
