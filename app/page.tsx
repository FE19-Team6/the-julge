export default function Home() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-h1 font-[var(--weight-h1)] tracking-[var(--tracking-h1)]">
        H1 헤딩 테스트
      </h1>

      <h2 className="text-h2 font-[var(--weight-h2)] tracking-[var(--tracking-h2)]">
        H2 헤딩 테스트
      </h2>

      <h3 className="text-h3 font-[var(--weight-h3)] tracking-[var(--tracking-h3)]">
        H3 헤딩 테스트
      </h3>

      <h4 className="text-h4 font-[var(--weight-h4)] tracking-[var(--tracking-h4)]">
        H4 헤딩 테스트
      </h4>

      <p className="text-body1 font-[var(--weight-body1)] tracking-[var(--tracking-body1)]">
        Body1 텍스트 - 예시 문장입니다.
      </p>

      <p className="text-body2 font-[var(--weight-body2)] tracking-[var(--tracking-body2)]">
        Body2 텍스트 - 예시 문장입니다.
      </p>

      <p className="text-caption font-[var(--weight-caption)] tracking-[var(--tracking-caption)]">
        Caption 텍스트 - 더 작은 크기 테스트.
      </p>
    </div>
  );
}
