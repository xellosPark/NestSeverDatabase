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

// ParseIntPipe는 다음과 같은 상황에서 매우 유용합니다:

// URL 파라미터 값을 정수형으로 자동 변환해야 할 때.
// 값이 유효한 숫자인지 검증해야 할 때.
// 추가적인 파이프를 정의하거나 사용할 수도 있으며, NestJS에서는 이를 확장하거나 커스터마이징할 수 있습니다.

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
