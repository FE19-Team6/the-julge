## StoreImage 테스트 코드

기본적으로 StoreImage는 **가로·세로 100%**로 채우기 때문에,
아래처럼 먼저 **틀(width/height)**을 만든 뒤 넣어주세요.

```tsx
<div className="p-10">
  // 1. 변경하기 오버레이
  <div className="w-[483px] h-[276px]">
    <StoreImage src="/img.jpg" variant="changeable" />
  </div>
  // 2. 단순 이미지 뷰
  <div className="w-[483px] h-[276px]">
    <StoreImage src="/img.jpg" variant="readonly" />
  </div>
  // 3. text + 이미지
  <div className="w-[483px] h-[276px]">
    <StoreImage src="/img.jpg" variant="status" title="마감 완료" />
  </div>
  // 4. 이미지 없음
  <div className="w-[483px] h-[276px]">
    <StoreImage variant="placeholder" />
  </div>
</div>
```
