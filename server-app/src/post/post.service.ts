import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
    // DB 저장하기위해서 constructor

    constructor(
       // 데코레이터는 TypeORM의 Repository 객체를 의존성 주입(DI, Dependency Injection)을 통해 사용할 수 있도록 합니다.
       // NestJS에서 데이터베이스와 상호작용하기 위해 레포지토리를 쉽게 사용할 수 있게 합니다.
        @InjectRepository(Post) 
        private postRepository: Repository<Post>,
    ){}

    // getPosts(){
    //     return ['a게시글', 'b게시클']
    // }
    // http://localhost:3030/posts?page=1
    getPosts(page: number) {
        // 한 페이지에 표시할 데이터 수를 설정합니다.
        const perPage = 10;
    
        // 가져올 데이터의 시작 위치(offset)를 계산합니다.
        // 예:
        // - 1페이지: offset = (1 - 1) * 10 = 0
        // - 2페이지: offset = (2 - 1) * 10 = 10
        // - 3페이지: offset = (3 - 1) * 10 = 20
        const offset = (page - 1) * perPage;
    
        // QueryBuilder를 사용하여 데이터 쿼리를 생성합니다.
        return this.postRepository
            .createQueryBuilder('post') // 'post'는 이 쿼리의 엔터티에 대한 별칭입니다.
            .orderBy('post.date', 'DESC') // 'post.date'를 기준으로 내림차순 정렬 (최신 데이터가 먼저)
            .take(perPage) // 가져올 데이터의 최대 개수 (여기서는 10개)
            .skip(offset) // 지정된 offset 위치부터 데이터를 가져옴
            .getMany();

        // .getMany()는 QueryBuilder가 생성한 SQL 쿼리를 실행하고,
        // 결과로 데이터베이스에서 가져온 여러 개의 엔터티 배열을 반환합니다.
        // 예를 들어, Post 엔터티의 데이터가 10개라면, Post[] 형식으로 반환됩니다.
        //
        // 주요 특징:
        // - 데이터베이스에서 여러 개의 레코드를 가져오는 데 사용됩니다.
        // - 반환값은 엔터티 객체의 배열입니다.
        // - 각 엔터티는 TypeORM에서 정의한 해당 엔터티 클래스(Post) 형식을 따릅니다.
        //
        // 예시:
        // const posts = await this.getPosts(1).getMany();
        // console.log(posts); // Post 엔터티 배열이 출력됩니다.
    }

    //http://localhost:3030/posts
    // {
    //     "latitude":123.1111, 
    //     "longitude":22.1111, 
    //     "color":"RED",
    //     "address":"서울시",
    //     "title":"해바라기 식당", 
    //     "description":"소프트웨어 맛집",
    //     "date": "2024-03-30 01:56:40.386",
    //     "score": 5,
    //     "imageUris":[]
    // }
    async createPost( createPostDto : CreatePostDto){
        const { latitude, longitude, color, address, title, description, date, score, imageUris,} = createPostDto;

        const post = this.postRepository.create({ 
            latitude,
            longitude,
            color,
            address,
            title,
            description,
            date,
            score,
            
         })

         try{
            await this.postRepository.save(post)
         } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('추가하는 도중에 에러가 발생했습니다.');
         }

         return post;
    }
}
