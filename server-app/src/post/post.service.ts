import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class PostService {
    // DB 저장하기위해서 constructor

    constructor(
        // 데코레이터는 TypeORM의 Repository 객체를 의존성 주입(DI, Dependency Injection)을 통해 사용할 수 있도록 합니다.
        // NestJS에서 데이터베이스와 상호작용하기 위해 레포지토리를 쉽게 사용할 수 있게 합니다.
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) { }

    // async getAllMarkers(user: User) {
    //     try {
    //         // 1. postRepository를 사용하여 데이터베이스에서 'post' 엔티티에 대해 쿼리 작성
    //         const markers = await this.postRepository
    //             .createQueryBuilder('post') // 'post'는 엔티티의 별칭(alias)
    //             .where('post.userId = :userId', { userId: user.id }) // userId가 현재 사용자의 ID와 일치하는 데이터 필터링
    //             .select([ // 반환할 데이터의 필드 지정 (필요한 데이터만 선택)
    //                 'post.id',          // 게시물의 ID
    //                 'post.latitude',    // 게시물의 위도
    //                 'post.longitude',   // 게시물의 경도
    //                 'post.color',       // 게시물의 색상
    //                 'post.score',       // 게시물의 점수
    //             ])
    //             .getMany(); // 필터링된 여러 개의 결과를 가져옴
    
    //         // 2. 쿼리 결과(markers)를 반환
    //         return markers;
    //     } catch (error) {
    //         // 3. 에러 발생 시 콘솔에 에러 로그 출력
    //         console.log(error);
    
    //         // 4. InternalServerErrorException 예외를 발생시켜 클라이언트에 에러 메시지 전달
    //         throw new InternalServerErrorException(
    //             '마커를 가져오는 도중 에러가 발생했습니다.', // 클라이언트에게 전달할 사용자 친화적인 에러 메시지
    //         );
    //     }
    // }


    // getPosts(page: number) {
    //     // 한 페이지에 표시할 데이터 수를 설정합니다.
    //     const perPage = 10;

    //     // 가져올 데이터의 시작 위치(offset)를 계산합니다.
    //     // 예:
    //     // - 1페이지: offset = (1 - 1) * 10 = 0
    //     // - 2페이지: offset = (2 - 1) * 10 = 10
    //     // - 3페이지: offset = (3 - 1) * 10 = 20
    //     const offset = (page - 1) * perPage;

    //     // QueryBuilder를 사용하여 데이터 쿼리를 생성합니다.
    //     return this.postRepository
    //         .createQueryBuilder('post')     // 'post'는 이 쿼리의 엔터티에 대한 별칭입니다.
    //         .orderBy('post.date', 'DESC')   // 'post.date'를 기준으로 내림차순 정렬 (최신 데이터가 먼저)
    //         .take(perPage)                  // 가져올 데이터의 최대 개수 (여기서는 10개)
    //         .skip(offset)                   // 지정된 offset 위치부터 데이터를 가져옴
    //         .getMany();                     // 필터링된 여러 개의 결과를 가져옴

    //     // .getMany()는 QueryBuilder가 생성한 SQL 쿼리를 실행하고,
    //     // 결과로 데이터베이스에서 가져온 여러 개의 엔터티 배열을 반환합니다.
    //     // 예를 들어, Post 엔터티의 데이터가 10개라면, Post[] 형식으로 반환됩니다.
    //     //
    //     // 주요 특징:
    //     // - 데이터베이스에서 여러 개의 레코드를 가져오는 데 사용됩니다.
    //     // - 반환값은 엔터티 객체의 배열입니다.
    //     // - 각 엔터티는 TypeORM에서 정의한 해당 엔터티 클래스(Post) 형식을 따릅니다.
    //     //
    //     // 예시:
    //     // const posts = await this.getPosts(1).getMany();
    //     // console.log(posts); // Post 엔터티 배열이 출력됩니다.
    // }

    // getPosts(){
    //     return ['a게시글', 'b게시클']
    // }
    // GET
    // http://localhost:3030/posts?page=1
    getPosts(page: number, user: User) {
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
            .createQueryBuilder('post')     // 'post'는 이 쿼리의 엔터티에 대한 별칭입니다.
            .where('post.userId = :userId', { userId: user.id }) // userId가 현재 사용자의 ID와 일치하는 데이터 필터링
            .orderBy('post.date', 'DESC')   // 'post.date'를 기준으로 내림차순 정렬 (최신 데이터가 먼저)
            .take(perPage)                  // 가져올 데이터의 최대 개수 (여기서는 10개)
            .skip(offset)                   // 지정된 offset 위치부터 데이터를 가져옴
            .getMany();                     // 필터링된 여러 개의 결과를 가져옴

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

    //POST
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
    // async createPost(createPostDto: CreatePostDto) {
    //     const { latitude, longitude, color, address, title, description, date, score, imageUris, } = createPostDto;

    //     const post = this.postRepository.create({ latitude, longitude, color, address, title, description, date, score, })

    //     try {
    //         await this.postRepository.save(post)
    //     } catch (error) {
    //         console.log(error);
    //         throw new InternalServerErrorException('추가하는 도중에 에러가 발생했습니다.');
    //     }

    //     return post;
    // }

    async createPost(createPostDto: CreatePostDto,  user: User) {
        const { latitude, longitude, color, address, title, description, date, score, imageUris, } = createPostDto;

        // ManyToOne 관계에 의해 User 정보 포함 (userId로 저장됨)
        const post = this.postRepository.create({ latitude, longitude, color, address, title, description, date, score, user})

        try {
            await this.postRepository.save(post)
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('추가하는 도중에 에러가 발생했습니다.');
        }

        //이 코드 구문은 **ES6의 객체 디스트럭처링(Destructuring)**을 사용하여, post 객체에서 특정 프로퍼티(user)를 제외하고 나머지 프로퍼티만 추출하는 방식입니다.
        // user: _
        // user 프로퍼티를 추출하면서 변수명 _에 저장합니다.
        // _는 관습적으로 "사용하지 않을 변수"를 나타냅니다. 즉, user 값은 더 이상 사용하지 않을 의도로 _에 저장한 것입니다.
        
        // ...postWithoutUser
        // ...(spread 연산자)를 사용하여 post 객체의 나머지 모든 프로퍼티를 새로운 객체 postWithoutUser에 저장합니다.
        // user 프로퍼티는 제외됩니다.

        const { user:_, ...postWithoutUser} = post

        return postWithoutUser;
    }

    // GET
    // http://localhost:3030/posts/1
    // {
    //     "id": 1,
    //     "latitude": 123.1111,
    //     "longitude": 22.1111,
    //     "color": "RED",
    //     "address": "서울시",
    //     "title": "해바라기 식당",
    //     "description": "소프트웨어 맛집",
    //     "date": "2024-03-29T16:56:40.386Z",
    //     "score": 5,
    //     "createdAt": "2025-01-08T08:19:53.682Z",
    //     "updateAt": "2025-01-08T08:19:53.682Z",
    //     "deletedAt": null
    // }
    // async getPostById(id: number) {
    //     try {
    //         const founPost = await this.postRepository
    //             .createQueryBuilder('post')
    //             .where('post.id = :id', { id })
    //             .getOne();

    //         if (!founPost) {
    //             throw new NotFoundException('존재하지 않는 피디입니다.');
    //         }
    //         return founPost;

    //     } catch (error) {
    //         console.log(error);
    //         throw new InternalServerErrorException('개별 데이터를 갖져오는 도중에 에러가 발생했습니다.');
    //     }
    // }

    async getPostById(id: number, user: User) {
        try {
            const founPost = await this.postRepository
                .createQueryBuilder('post')
                .where('post.userId = :userId', { userId: user.id })
                .andWhere('post.id = :id', { id })
                .getOne();

            if (!founPost) {
                throw new NotFoundException('존재하지 않는 피디입니다.');
            }
            return founPost;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('개별 데이터를 갖져오는 도중에 에러가 발생했습니다.');
        }
    }

    // async deletePost(id: number) {
    //     try {
    //         const result = await this.postRepository
    //             .createQueryBuilder('post')
    //             .delete()
    //             .from(Post)
    //             .where(' id = :id', { id })
    //             .execute();

    //         if (result.affected === 0) {
    //             throw new NotFoundException('존재하지 않는 피드입니다.');
    //         }

    //         return id;
    //     } catch (error) {
    //         console.log(error);
    //         throw new InternalServerErrorException('삭제 도중에 에러가 발생했습니다.');
    //     };
    // }

    async deletePost(id: number, user: User) {
        try {
            // 1. QueryBuilder를 사용하여 특정 조건에 따라 Post 삭제 쿼리 작성 및 실행
            const result = await this.postRepository
                .createQueryBuilder('post') // 'post' 엔티티에 대한 QueryBuilder 생성 (엔티티 별칭: 'post')
                .delete() // 쿼리를 삭제 명령으로 설정
                .from(Post) // 삭제 대상 엔티티 지정 (Post 테이블)
                .where('userId = :userId', { userId: user.id }) // 현재 사용자의 게시물인지 확인 (userId가 일치하는 조건)
                .andWhere('id = :id', { id }) // 삭제할 게시물의 id가 매개변수로 전달된 id와 일치하는지 확인
                .execute(); // 작성된 쿼리 실행
    
            // 2. 삭제된 행의 개수를 확인하여 삭제 여부 판단
            if (result.affected === 0) {
                // 삭제된 행이 없을 경우 (조건에 해당하는 게시물이 없을 경우)
                throw new NotFoundException('존재하지 않는 피드입니다.'); // 404 에러 반환
            }
    
            // 3. 삭제 성공 시 삭제된 게시물의 id를 반환
            return id;
        } catch (error) {
            // 4. 삭제 과정에서 예외 발생 시 로그 출력
            console.log(error);
    
            // 5. 예외를 클라이언트로 전달
            throw new InternalServerErrorException('삭제 도중에 에러가 발생했습니다.'); // 500 에러 반환
        }
    }
}
