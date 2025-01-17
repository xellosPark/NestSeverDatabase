import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/@common/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';


@Controller()
@UseGuards(AuthGuard())
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

    // @Get('/markers/my')
    // getAllMarkers(@GetUser() user:User){
    //     return this.postService.getAllMarkers(user);
    //}



    // // 데이터 1씩 받아오기
    // @Get('/posts/:id')
    // getPostById(@Param('id', ParseIntPipe) id: number ){  //
    //     return this.postService.getPostById(id);
    // }

      // 데이터 1씩 받아오기
      @Get('/posts/:id')
      getPostById(@Param('id', ParseIntPipe) id: number, @GetUser() user:User ){  //
          return this.postService.getPostById(id, user);
      }
  


    // 10개씩 받아오기
    // @Query는 NestJS에서 제공하는 데코레이터로, HTTP 요청의 **쿼리 파라미터(query parameters)**를 처리하기 위해 사용됩니다.
    // 쿼리 파라미터는 일반적으로 URL의 ?key=value 형태로 전달되는 데이터입니다.
    // @Get('/posts')
    // getPosts(@Query('page') page: number){
    //     return this.postService.getPosts(page);
    // }

    // @Get('/posts/my')
    // getPosts(@Query('page') page: number){
    //     return this.postService.getPosts(page);
    // }

    // @Post('/posts')
    // createPost(@Body() createPostDto: CreatePostDto ){
    //     return this.postService.createPost(createPostDto);
    // }

    // @Delete('/posts/:id')
    // deletePost(@Param('id', ParseIntPipe) id: number){  //
    //     return this.postService.deletePost(id);
    // }

    @Get('/posts/my')
    getPosts(@Query('page') page: number, @GetUser() user:User){
        return this.postService.getPosts(page, user);
    }

    @Post('/posts')
    createPost(@Body() createPostDto: CreatePostDto, @GetUser() user:User ){
        return this.postService.createPost(createPostDto, user);
    }

    @Delete('/posts/:id')
    deletePost(@Param('id', ParseIntPipe) id: number, @GetUser() user:User){  //
        return this.postService.deletePost(id, user);
    }

    // @Patch('/posts/:id')
    // @UsePipes(ValidationPipe)
    // updatePost(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() updatePostDto: Omit<CreactPostDto, 'latitude' | 'longitude' | 'address'>,
    //     @GetUser() user:User,
    // ) {
    //  return this.postService.updatePost(id, updatePostDto, user)
    // }



}
