import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>, // User 엔티티에 대한 TypeORM 리포지토리 주입
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET, // JWT 토큰 서명에 사용되는 비밀 키 (프로덕션 환경에서는 환경 변수 사용)
      });
    }
  
    // JWT 토큰의 페이로드를 검증하는 메서드
    async validate(payload: {email:string}) {
      const { email } = payload;
      // 사용자 이름으로 사용자 찾기
      const user = await this.userRepository.findOneBy({ email });
  
      if (!user) {
        // 사용자가 없으면 UnauthorizedException 예외 발생
        throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
      }
  
      // 사용자 객체를 요청 객체에 첨부
      return user;
    }
  }