# Coding Style Guide

본 프로젝트는 ESLint + Prettier 기반으로 코드 스타일을 통일합니다.

---

## 1. Prettier 규칙

- 따옴표: double quote
- 세미콜론: 사용
- trailing comma: es5
- 자동 정렬 및 자동 포맷 적용

---

## 2. ESLint 규칙

- Next.js core-web-vitals 적용
- TypeScript recommended 규칙 사용
- 미사용 변수 경고 (`no-unused-vars`)
- `_` 로 시작하는 변수는 허용
- `console.log` 금지 (warn)
- `debugger` 금지 (warn)

---

## 3. 파일 네이밍 규칙

| 타입       | 규칙              | 예시                 |
| ---------- | ----------------- | -------------------- |
| 컴포넌트   | PascalCase        | `Button.tsx`         |
| 훅         | camelCase         | `useLogin.ts`        |
| 서비스/API | camelCase         | `authService.ts`     |
| 페이지     | Next.js 기본 규칙 | `app/login/page.tsx` |

---

## 4. Import 규칙

- 절대 경로(`@/`) 우선 사용
- 외부 → 내부 순서 유지  
  (예: 라이브러리 → hooks → components → utils)
- 사용하지 않는 import 제거

---

## 5. 기타 규칙

- 함수는 화살표 함수 우선
- 하나의 파일에는 하나의 컴포넌트만 작성
- 스타일은 가능한 컴포넌트 가까이에 배치
