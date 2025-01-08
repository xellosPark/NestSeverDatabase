import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ubisam8877',
      database: 'matzip-server',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    PostModule
  ],
  
  providers: [],
})
export class AppModule {}
