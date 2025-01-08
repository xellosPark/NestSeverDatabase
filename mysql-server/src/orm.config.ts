import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// TypeORM 설정을 반환하는 함수
function ormConfig(): TypeOrmModuleOptions {
  // 공통 설정 객체
  const commonConf = {
    SYNCHRONIZE: false, // 데이터베이스 동기화를 활성화 여부 (개발 환경에서는 true로 사용 가능, 운영 환경에서는 false 권장)
    // ENTITIES: [__dirname + '/domain/*{.ts,.js}'], // 엔터티(Entity) 파일의 경로 설정
    entities: [__dirname + '/../**/*.entity.{js,ts}'],  // 엔티티 경로
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'], // 마이그레이션(Migration) 파일의 경로 설정
    CLI: {
      migrationsDir: 'src/migrations', // 마이그레이션 파일이 생성될 디렉토리 설정
    },
    MIGRATIONS_RUN: false, // 애플리케이션 시작 시 자동으로 마이그레이션 실행 여부 설정
  };

  // TypeORM 모듈 옵션 반환
  return {
    name: 'default', // 기본 연결 이름 설정
    type: 'mysql', // 사용할 데이터베이스 유형 (MySQL)
    database: 'test', // 데이터베이스 이름
    host: 'localhost', // 데이터베이스 호스트 주소
    port: Number(3306), // 데이터베이스 포트 번호
    username: 'root', // 데이터베이스 사용자 이름
    password: 'ubisam8877', // 데이터베이스 비밀번호
    logging: true, // SQL 쿼리 로깅 활성화 여부
    synchronize: commonConf.SYNCHRONIZE, // 동기화 옵션 (commonConf에서 가져옴)
    migrations: commonConf.MIGRATIONS, // 마이그레이션 경로 설정 (commonConf에서 가져옴)
    migrationsRun: commonConf.MIGRATIONS_RUN, // 마이그레이션 자동 실행 옵션 (commonConf에서 가져옴)
  };
}

// ormConfig 함수를 외부에서 사용할 수 있도록 내보냄
export { ormConfig };