# Commit & Branch Rules

프로젝트 협업을 위해 아래 규칙을 따릅니다.

---

## 1. Commit Message Format

type: 메시지 (#이슈번호)

### 예시

feat: 로그인 API 연동 (#12)
fix: 토큰 만료 오류 수정 (#45)
docs: README 업데이트 (#7)
chore: ESLint 설정 추가 (#38)

---

## 2. Commit Types

| type     | 설명                    |
| -------- | ----------------------- |
| feat     | 새로운 기능             |
| fix      | 버그 수정               |
| docs     | 문서 변경               |
| style    | 코드 포맷팅             |
| refactor | 기능 변경 없는 리팩토링 |
| test     | 테스트 코드             |
| chore    | 빌드/설정/패키지 작업   |

---

## 3. Branch Naming Rule

type/#이슈번호-설명

### 예시

feat/#38-eslint-prettier
fix/#12-token-bug
docs/#40-readme
refactor/#21-login-clean

---

## 4. Branch Rule Check (Optional)

Husky pre-push 훅에서 규칙을 검사합니다.

```
`scripts/validate-branch.sh`:
branch=$(git symbolic-ref --short HEAD)

echo "$branch" | grep -Eq '^(feat|fix|docs|style|refactor|test|chore)/#?[0-9]+-'
```
