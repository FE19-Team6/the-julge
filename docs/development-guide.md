# Development Guide

프로젝트 개발을 위한 기본 실행 방법과 규칙을 정리합니다.

---

## 1. 설치 및 실행

### 패키지 설치

```
pnpm install
```

### 개발 서버 실행

```
pnpm dev
```

---

## 2. 프로젝트 구조 (요약)

- `app/` — 페이지 라우팅
- `components/` — 공통 UI 컴포넌트
- `hooks/` — 커스텀 훅
- `api/` — axios 인스턴스 및 API 요청
- `public/` — 이미지 및 정적 파일
- `docs/` — 프로젝트 문서
- `.husky/` — Git hooks

---

## 3. API 사용 (axios 인스턴스)

API 인스턴스는 `api/axios.ts` 에 위치합니다.

사용 예시:

```
import api from "@/lib/api/axios";
const response = await api.get("/notices");
```

---

## 4. 환경변수

현재 프로젝트는 API Base URL이 고정되어 있어  
`.env` 설정이 필수는 아닙니다.

필요 시 다음과 같이 확장할 수 있습니다:

```
NEXT_PUBLIC_API_BASE_URL="..."
```

---

## 5. Git Hooks

- 커밋 시: ESLint + Prettier 자동 실행
- 브랜치 푸시 전: 브랜치명 규칙 검사(선택 적용)

---

## 6. 코드 스타일

- ESLint + Prettier 자동 적용
- commit 전에 lint-staged가 코드 포맷 자동 정리
- 자세한 규칙은 `coding-style.md` 참고

---

## 7. 커밋 & 브랜치

- 커밋: `type: 메시지 (#번호)`
- 브랜치: `type/#번호-설명`

자세한 규칙은 `commit-branch-rule.md` 참고.

---

## 8. 기타

- 새로운 폴더/파일 추가 시 alias(`@/`) 사용 권장
- 공통 UI는 components에 정리
- 페이지 로직은 app/ 기반으로 구성
