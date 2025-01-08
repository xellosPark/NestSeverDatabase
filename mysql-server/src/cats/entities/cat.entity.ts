import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

                   //테이블명 cats 이름으로 사용하고 싶을때
// @Entity({ 'name' : 'cats'})
@Entity() // 현제 테이블이 Cat이를 사용해서 그대로 사용할경우에는 내용 생략
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}