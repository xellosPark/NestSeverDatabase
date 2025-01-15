import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

// PassportModule은 NestJS에서 제공하는 인증 관리 모듈로, Node.js의 passport 라이브러리를 기반으로 동작합니다. 이 모듈은 인증 로직을 손쉽게 구현할 수 있도록 도와주는 도구입니다.

// 주요 기능
// 	•	다양한 인증 전략 지원 (e.g., JWT, Local, OAuth)
// 	•	인증 플로우에서의 미들웨어 역할
// 	•	NestJS와 passport 라이브러리를 원활히 통합

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // JWT 기본 전략 설정 // Passport 모듈 추가
    JwtModule.register({}),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  //jwtstrategy를 이 Auth 모듈에서 사용할수있게 등록
  providers: [AuthService, JwtStrategy],
  //JwtStrategy, PassportModule를 다른 모듈에서 사용할수 있게 등록
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

// JwtModule.register() (옵션 전달 없이 사용)
// 이 경우, 기본 설정으로 JwtModule이 등록됩니다. 옵션을 전달하지 않기 때문에 secret 키, signOptions, 또는 기타 설정값이 없습니다. 따라서 실제로 동작 가능한 JWT 생성 또는 검증을 수행하기 위해서는 추가적인 설정이 필요합니다.

// JwtModule.register({}) (옵션 전달)
// 옵션 객체를 전달하여 JWT 모듈을 사용자 정의 설정으로 등록합니다. 일반적으로 환경 변수나 설정 파일에서 가져온 값을 사용합니다.