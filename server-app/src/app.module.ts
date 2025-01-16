import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), // isGlobal 옵션을 true로 설정하여 ConfigModule을 전역적으로 사용 가능하게 함.
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ubisam8877',
      //password: 'admin_board',
      database: 'matzip-server',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    PostModule,
    AuthModule
  ],
  
  //ConfigService란?
  //ConfigService는 NestJS의 @nestjs/config 모듈에서 제공되는 서비스로, 환경 변수 및 애플리케이션 설정값을 관리합니다.
  //주로 환경 변수(process.env)를 읽고 관리하며, 타입 안전성과 유효성 검사를 제공합니다.
  providers: [ConfigService],
})
export class AppModule {}
