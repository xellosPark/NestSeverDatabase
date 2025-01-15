nest new server-app --skip-git
npm i pg typeorm @nestjs/typeorm
nest g module post
nest g controller post
nest g service post
npm install class-validator --save

class-validator란?
class-validator는 Node.js 및 TypeScript 프로젝트에서 **데이터 유효성 검사(validation)**를 쉽게 처리할 수 있도록 돕는 라이브러리입니다. 주로 클래스의 프로퍼티에 데코레이터를 사용하여 유효성 검사 규칙을 설정하고, 이를 통해 데이터가 요구 사항을 충족하는지 검증합니다.


nest g module auth -> module 생성
nest g controller auth --no-spec
nest g service auth --no-spec


npm install class-transformer class-validator
npm install bcryptjs --save  
import * as bcrypt from 'bcryptjs';

npm install @nestjs/jwt @nestjs/config
npm install passport passport-jwt @nestjs/passport
npm i --save-dev @types/passport-jwt

npm install @nestjs/passport passport passport-jwt