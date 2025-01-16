import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

    private activeEmail: string | null = null; // 단일 이메일 저장

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    // 실패 예제
    // POST localhost:3030/auth/signup
    // Body raw
    // {
    //     "email": "asd@asd.com",
    //     "password": "1234567"
    // }
    // 결과
    // {
    //     "message": [
    //         "비밀번호는 영문과 숫자를 포함해야 합니다.",
    //         "비밀번호는 최소 8자에서 최대 20자까지 입력 가능합니다."
    //     ],
    //     "error": "Bad Request",
    //     "statusCode": 400
    // }
    // 성공 예제
    // POST localhost:3030/auth/signup
    // Body raw
    // {
    //     "email": "asd@asd.com",
    //     "password": "a1234567"
    // }
    // 결과
    // 1
    
    async signup(authDto: AuthDto) {
        const {email, password} = authDto;

        // 암호 처리
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({ email, password: hashedPassword, });

        try{
            await this.userRepository.save(user);
        } catch (error) {
            console.log(error);
            // 이미 email 있는지 확인 23505 확인 한다.
            if(error.code === '23505'){
                throw new ConflictException('이미 존재하는 이메일입니다.');
            }

            throw new InternalServerErrorException('회원가입 도중 에러가 발생했습니다.');
        }
    }

    // async getTokens(Payload: {email: string}){
    async getTokens(email: string){
        const Payload = { email };
        const [accessToken, refreshToken] = await Promise.all([
            // jwt service 사용할수 있도록 private jwtService: JwtService
            this.jwtService.signAsync(Payload, {
                // secret: 'Secret8877',
                // expiresIn: '30m', // 30분 동안 유효
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
            }),
            this.jwtService.signAsync(Payload, {
                // secret: 'Secret8877',
                // expiresIn: '30d', // 30일
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
            })
        ])

        return { accessToken, refreshToken };
    }

 
    // 성공 예제
    // POST localhost:3030/auth/signin
    // Body raw
    // {
    //     "email": "asd@asd.com",
    //     "password": "a1234567"
    // }
    // 결과
    // {
    //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBhc2QuY29tIiwiaWF0IjoxNzM2ODY1NTU0LCJleHAiOjE3MzY4NjczNTR9.eT6aG1FKkEOzQvpeObCnkgX73OE30gQ4IvISvnvCsAo",
    //     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBhc2QuY29tIiwiaWF0IjoxNzM2ODY1NTU0LCJleHAiOjE3Mzk0NTc1NTR9.jBoxb7t0k1CxocXXuIRVFiUSWIrEgzGSMFIyd0Th-BA"
    // }

    // 실패 예제
    // POST localhost:3030/auth/signin
    // Body raw
    // {
    //     "email": "asd@asd.com",
    //     "password": "1234567"
    // }
    // 결과
    // {
    //     "message": [
    //         "비밀번호는 영문과 숫자를 포함해야 합니다.",
    //         "비밀번호는 최소 8자에서 최대 20자까지 입력 가능합니다."
    //     ],
    //     "error": "Bad Request",
    //     "statusCode": 400
    // }
    

    async signin(authDto: AuthDto) {
        const {email, password} = authDto;

        // 입력받은 사용자 이름과 비밀번호를 콘솔에 출력
        console.log('signIn email:', email);
        console.log('signIn password:', password);

        const user = await this.userRepository.findOneBy( { email } );

        if (user && (await bcrypt.compare(password, user.password))) {
            
            // const { accessToken , refreshToken} = await this.getTokens( { email } )
            const { accessToken , refreshToken} = await this.getTokens( email )

            // 콘솔 로그 추가
            console.log('accessToken  login for user:', accessToken);
            console.log('refreshToken login for user:', refreshToken);

             // 이메일 저장
             this.activeEmail = email;
             console.log('Active email:', this.activeEmail);

            await this.updateHashedRefreshToken(user.id, refreshToken);
            
            // client에 보낸다.
            return { accessToken, refreshToken };

        } else {
            throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
    }

    // 실패 예제
    // GET localhost:3030/auth/refresh
    // tructure property 'email' of 'user' as it is undefined.
    // Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyIiwic3ViIjoyLCJpYXQiOjE3MjUyNTc5NDIsImV4cCI6MTcyNTI2MTU0Mn0.rI_4YeGDKVwnbhO9buvfiA9eJz5SzmdwUTlky7mUznk
    // {
    //   "statusCode": 500,
    //    "message": "Internal server error"
    //}

    // jwt.strategy.ts 전략 파일
    // 전략에서는 JWT의 페이로드에 포함된 사용자 정보를 바탕으로 데이터베이스에서 사용자를 조회합니다.

    // 성공 예제

    private async updateHashedRefreshToken(id: number, refreshToken:string){

        const salt = await bcrypt.genSalt();
        const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

        // console.log("Original Refresh Token:", refreshToken);

        try {
            await this.userRepository.update(id, {hashedRefreshToken})
        } catch (error){
            console.log(error);
            throw new InternalServerErrorException('회원가입 도중 에러가 발생했습니다.');
        }
    }
    
    async refreshToken( user: User ){
        // user 정보는 client에서 가져와야한다.
        // console.log( 'user' );
        const { email } = user;

             // 저장된 이메일과 요청 이메일 비교
        if (this.activeEmail !== email) {
            console.error(`이메일 불일치: 저장된 이메일(${this.activeEmail}), 요청된 이메일(${email})`);
            throw new ForbiddenException('이메일이 일치하지 않아 인증에 실패했습니다.');
        }
            
        const { accessToken , refreshToken} = await this.getTokens( email );

        console.log("User email:", email);

        if(!user.hashedRefreshToken){
            throw new ForbiddenException('Invalid refresh token');
        }

        // user.hashedRefreshToken은 사용자가 발급받은 Refresh Token을 해싱한 값으로, 보안성을 유지하면서 토큰 검증 과정을 지원합니다.
        await this.updateHashedRefreshToken(user.id, refreshToken);

        return { accessToken , refreshToken };
    }
}
