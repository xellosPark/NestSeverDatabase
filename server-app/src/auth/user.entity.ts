import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, Unique, } from 'typeorm';
import { RoleState } from './Role.enum';
  
/**
 * 사용자 엔티티
 */
@Entity('usersinfo') // 데이터베이스 테이블 이름을 'users'로 설정
@Unique(['email'])
export class User extends BaseEntity {
/**
 * 사용자 ID
 * - 기본 키
 */
@PrimaryGeneratedColumn()
id: number;

/**
 * 사용자 이름
 */
@Column({ length: 50,  nullable: true })
name: string;

/**
 * 사용자 이메일
 * - 고유값
 */
@Column()
email: string;

/**
 * 사용자 전화번호
 */
@Column({ length: 11, default: '01000000000' })
phoneNumber: string;

/**
 * 사용자 비밀번호
 */
@Column()
password: string;

/**
 * 사용자 직책
 */
@Column({ nullable: true })
position: string;

/**
* 사용자 사이트 권한
* - enum을 사용하여 권한 설정
* - 기본값: Role.Private (권한 없음)
*/
@Column({ nullable: true , default: RoleState.Private, })
role: RoleState;

/**
 * 생성 날짜
 * - TypeORM에서 자동으로 관리
 */
@CreateDateColumn()
createdAt: Date;

/**
 * 수정 날짜
 * - TypeORM에서 자동으로 관리
 */
@UpdateDateColumn()
updatedAt: Date ;

/**
 * 삭제 날짜
 * - TypeORM에서 자동으로 관리
 */
@DeleteDateColumn({ nullable: true })
deletedAt: Date | null;

/**
 * 해시된 리프레시 토큰
 * - 사용자의 리프레시 토큰을 암호화하여 저장
 * - nullable: true 설정으로 선택적으로 저장 가능
 * - 리프레시 토큰이 없는 경우 null 상태로 유지
*/
@Column({ nullable: true })
hashedRefreshToken: string;
}