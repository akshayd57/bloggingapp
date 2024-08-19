import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UserModule, PostsModule],
})
export class AppModule {}
