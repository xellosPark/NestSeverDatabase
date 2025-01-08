import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';


@Controller()
export class PostController {
    constructor(private postService: PostService) { }

    // @Get('/posts')
    // getPosts(){
    //     return this.postService.getPosts();
    // }

    @Get('/posts/:id')
    getPostById(@Param('id', ParseIntPipe) id: number){
        return this.postService.getPostById(id);
    }


    // 10개씩 받아오기
    @Get('/posts')
    getPosts(@Query('page') page: number){
        return this.postService.getPosts(page);
    }

    @Post('/posts')
    createPost(@Body() createPostDto: CreatePostDto ){
        return this.postService.createPost(createPostDto);
    }
}
