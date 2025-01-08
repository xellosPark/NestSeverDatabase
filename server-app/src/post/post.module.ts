import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])], // Post 엔터티를 등록
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
