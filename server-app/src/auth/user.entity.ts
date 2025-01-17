import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity, Unique, OneToMany, } from 'typeorm';
import { RoleState } from './Role.enum';
import { Post } from 'src/post/post.entity';
  
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

// User <- > Post 연결 완료
@OneToMany(() => Post, (post) => post.user, { eager: false})
  post: Post[];

}

// @OneToMany 데코레이터는 TypeORM에서 엔티티 간의 일대다 관계를 설정할 때 사용됩니다. 1:n
// 이 관계를 통해 하나의 엔티티(예: User)가 여러 개의 관련 엔티티(예: Post)와 연결될 수 있습니다. 

// @OneToMany:

// One은 이 엔티티(User)를 의미하며,
// Many는 관련 엔티티(Post)를 의미합니다.
// 즉, 한 User는 여러 개의 Post를 가질 수 있다는 관계를 나타냅니다.
// 첫 번째 매개변수 () => Post:

// 관계를 맺을 엔티티를 지정합니다. 여기서 Post 엔티티와 연결된다는 것을 명시합니다.
// 두 번째 매개변수 (post) => post.user:

// Post 엔티티에서 이 관계를 참조하는 필드를 지정합니다.
// 여기서 post.user는 Post 엔티티에서 User와 연결된 필드를 의미합니다.
// post: Post[]:

// Post 엔티티 배열로, 이 User와 연결된 모든 게시글(Post)을 나타냅니다.

// eager: false
// eager: false는 기본값으로 설정되어 있으며, 관계된 엔티티를 자동으로 로드하지 않습니다.
// 즉, 엔티티를 쿼리할 때, 관계된 엔티티 데이터를 가져오려면 명시적으로 쿼리를 작성하거나 접근해야 합니다.
// 이는 필요하지 않은 데이터를 로드하지 않으므로 성능 최적화에 유리합니다.