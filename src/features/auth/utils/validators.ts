/* ---------------------------------------------------------
   회원가입 입력값을 검사하기 위한 간단한 유틸 함수들

   - isValidEmail      : 이메일이 올바른 형식인지 검사 + 허용 도메인 체크
   - isValidPassword   : 비밀번호가 8자 이상인지 검사
   - isSamePassword    : 비밀번호와 비밀번호 확인이 같은지 검사
---------------------------------------------------------- */

// 이메일 형식 + 허용 도메인 체크
export const isValidEmail = (value: string) => {
  if (!value) return false;

  const allowedDomains = ["naver.com", "daum.net", "gmail.com"];

  // 기본 이메일 형식이 맞는지 체크
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) return false;

  // 도메인만 추출함
  const domain = value.split("@")[1];

  // 허용된 도메인인지 체크
  return allowedDomains.includes(domain);
};

// 비밀번호가 8자 이상인지 확인
export const isValidPassword = (value: string) => value.length >= 8;

// 두 비밀번호 동일한지 확인
export const isSamePassword = (password: string, confirm: string) =>
  password === confirm;
