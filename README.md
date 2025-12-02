# 더줄게 — 지역 기반 알바 채용 플랫폼 (6팀)

Next.js(App Router) · TypeScript · Tailwind CSS · pnpm

---

## 📌 프로젝트 소개

사용자가 **선호 지역 기반으로 알바 공고를 탐색**할 수 있는 웹 서비스입니다.
박유진 · 조동현 · 이나래 이 **2주간** 진행했습니다.

---

## 🧠 핵심 특징

### ✔ 이슈 중심 개발

* 모든 요구사항을 **최소 단위 기능**으로 분리
* GitHub Projects + Milestone으로 우선순위/데드라인 관리
* 기능 단위 → 컴포넌트/폴더 구조 1:1 매핑

### ✔ 인증 구조

* JWT를 **로컬스토리지 대신 서버 쿠키(HTTP Only)**로 관리
* 미들웨어에서 쿠키 기반으로 인증 검증
* Next.js 환경에 최적화된 보안 설계

### ✔ 구조적 개발 규칙

* **Server Component 우선 전략**
* 필요한 곳만 `use client`, 필요 시 브릿지 컴포넌트
* 폼 훅 / API 훅 / UI를 분리한 **3-분리 패턴**

### ✔ 유저 타입 분기

* employer / employee 페이지를 따로 만들지 않고
* **한 페이지에서 쿠키 기반으로 UI 완전 분기**

### ✔ 안정적인 데이터 흐름

* 복잡한 API 응답 → **mapper layer**로 UI에 맞게 변환
* 유지보수성과 가독성 향상

---

## 🛠️ 기술 스택

* **Framework:** Next.js(App Router)
* **Language:** TypeScript
* **UI:** Tailwind CSS
* **Package:** pnpm
* **CI:** GitHub Actions
* **Analytics:** Vercel Analytics

---

## 🔍 품질 관리 (Quality Assurance)

### ✔ GitHub Actions 기반 CI

* 모든 PR은 **CI 통과 후에만 머지 가능**
* Type Check, ESLint, Build Test 자동화

### ✔ Husky + Lint-Staged

* 커밋 단계에서 자동으로

  * **ESLint 검사**
  * **Prettier 포맷팅**
  * **Tailwind Prettier Plugin 정렬**
* 코드를 올리기 전에 팀 컨벤션에 맞게 자동 정리되어 코드 품질 유지

### ✔ 정적 분석 도구

* ESLint + Prettier + Tailwind CSS Prettier Plugin
* 코드 스타일, 클래스 순서, 포맷 통일

### ✔ Vercel Analytics

* 라우트별 성능 지표 & 서버 응답 시간 추적
* 병목 구간 확인 및 성능 개선 방향을 수립할 수 있음

---

## 🚀 향후 추가 기능

* 공고 즐겨찾기
* 지원 내역 페이지
* 추천 공고 알고리즘 고도화
* 실시간 알림(WebSocket)

---

# 📁 폴더 구조 (NEXT-APP)

```
NEXT-APP/
├── .github/                  # issue, pr template
├── .vscode/
├── public/                   # 정적 파일 (favicon, images 등)
│   └── fonts/
│   └── icons/
│   └── images/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # 공용 레이아웃
│   │   ├── globals.css
│   │   └── (routes)/         # 라우트 그룹 (선택)
│   │       └── main/         # /main
│   │           ├── page.tsx
│   │           ├── components/   # MainPage 전용 컴포넌트
│   │           ├── hooks/         # MainPage 전용 훅
│   │           └── module/        # utils, service 등
│   │
│   ├── components/           # 공용 UI 컴포넌트
│   ├── apis/                 # 공용 API
│   ├── hooks/                # 재사용 훅
│   ├── layouts/              # 추가 레이아웃 필요 시
│   └── lib/                  # 유틸, helpers
│
├── .gitignore
├── eslint.config.js
├── next.config.js
├── package.json
├── README.md
└── tailwind.config.js
```


필요하면 **더 줄인 초간단 버전** 또는 **GitHub 예쁘게 꾸미는 뱃지 버전**도 만들어줄게!
