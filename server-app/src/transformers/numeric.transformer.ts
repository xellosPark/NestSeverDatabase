/**
 * 이 클래스는 데이터베이스와 애플리케이션 간 데이터 변환을 처리하는 Transformer 클래스입니다.
 * 
 * - 목적:
 *   데이터베이스에서 데이터를 가져오거나 저장할 때 데이터 타입이 달라질 수 있습니다.
 *   이 클래스는 숫자 데이터의 변환을 처리하여 데이터 일관성을 유지합니다.
 * 
 * - 주요 메서드:
 *   1. **`to(data: number): number`**
 *      - 이 메서드는 애플리케이션에서 데이터베이스로 데이터를 저장할 때 호출됩니다.
 *      - 매개변수:
 *        - `data`: 애플리케이션에서 전달된 숫자 데이터.
 *      - 반환값:
 *        - 변환되지 않은 원본 숫자 데이터(`data`).
 *      - 이 메서드의 역할은 주로 데이터베이스에 저장하기 전에 데이터를 변환하는 것입니다.
 *        여기서는 변환 없이 그대로 저장합니다.
 * 
 *   2. **`from(data: string): number`**
 *      - 이 메서드는 데이터베이스에서 데이터를 가져올 때 호출됩니다.
 *      - 매개변수:
 *        - `data`: 데이터베이스에서 전달된 문자열 데이터.
 *      - 반환값:
 *        - 문자열 데이터를 숫자로 변환한 값(`parseFloat(data)`).
 *      - 이 메서드는 데이터베이스에서 숫자를 문자열로 반환하는 경우, 이를 애플리케이션에서 사용할 수 있도록 숫자로 변환합니다.
 * 
 * - 사용 예시:
 *   이 Transformer는 `@Column` 데코레이터의 `transformer` 옵션에서 사용됩니다.
 *   ```typescript
 *   @Column({
 *       type: 'numeric',
 *       transformer: new ColumlnNumericTransformer(),
 *   })
 *   amount: number;
 *   ```
 *   위 설정을 통해 `amount` 열은 데이터베이스에서 `numeric` 타입으로 저장되고,
 *   데이터베이스와 애플리케이션 간의 변환 과정에서 `ColumlnNumericTransformer`를 사용합니다.
 * 
 * - 예시 동작:
 *   - 데이터 저장:
 *     `to` 메서드를 통해 변환된 숫자 데이터가 데이터베이스에 저장됩니다.
 *   - 데이터 읽기:
 *     데이터베이스에서 가져온 문자열 데이터를 `from` 메서드를 통해 숫자로 변환합니다.
 */
export class ColumlnNumericTransformer {
    to(data: number): number {
        return data; // 데이터베이스에 저장할 때 변환 없이 그대로 반환
    }
    from(data: string): number {
        return parseFloat(data); // 데이터베이스에서 가져온 문자열을 숫자로 변환
    }
}