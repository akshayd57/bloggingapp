import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { PostsModule } from './posts/posts.module';
import { DatabaseService } from './database/database.service';
import { JwtService } from '@nestjs/jwt';
@Global()
@Module({
  imports: [UserModule, PostsModule],
  providers: [DatabaseService, JwtService]
})
export class AppModule { }
