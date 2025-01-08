import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MarkerColor } from "./marker-color.enum";
import { ColumlnNumericTransformer } from "src/transformers/numeric.transformer";

@Entity()
export class Post extends BaseEntity{
    @PrimaryGeneratedColumn() // 자동 증가 ID
    id: number;

    @Column({
        type: 'decimal',
        transformer: new ColumlnNumericTransformer(),
    })
    latitude: number;

    @Column({
        type: 'decimal',
        transformer: new ColumlnNumericTransformer(),
    })
    longitude: number;
    
    @Column()
    color: MarkerColor;

    @Column()
    address: string;

    @Column()
    title: string;

    @Column()
    description: string;

    /**
    * 이 데코레이터는 엔터티 클래스에서 데이터베이스 테이블의 열(column)을 정의합니다.
    * 
    * - `type`: 열의 데이터 타입을 지정합니다. 여기서는 'timestamp with time zone'을 사용하여,
    *   타임스탬프 데이터에 시간대 정보를 포함하도록 설정합니다.
    * 
    * - `default`: 열의 기본값을 지정합니다. 여기서는 데이터가 삽입될 때 별도로 값을 설정하지 않으면,
    *   데이터베이스의 `CURRENT_TIMESTAMP` 값을 기본값으로 사용합니다. 
    *   `CURRENT_TIMESTAMP`는 현재 날짜와 시간을 반환합니다.
    * 
    * 이 설정은 주로 날짜와 시간 정보(예: 생성 시간, 수정 시간 등)를 자동으로 기록하려는 경우에 사용됩니다.
    */

    @Column({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    })
    date: Date;

    @Column()
    score: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}