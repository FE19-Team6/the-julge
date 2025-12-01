/*
- 프로필 입력값 유효성 검사 함수들
- 프로필 생성/수정 시 사용되는 입력 필드의 유효성을 검사합니다.
- validateName: 이름 검사 (빈값 X, 2글자 이상, 한글/영문만)
- validatePhone: 핸드폰 번호 검증 (빈값 X, 숫자만, 10-11자리)
*/

// 이름 유효성 검사
export const validateName = (name: string): string => {
  if (name.trim() === "") 
    return "이름을 입력해주세요";

  if (name.length < 2) 
    return "이름 전체를 입력해주세요";

  const namePattern = /^[가-힣a-zA-Z]+$/;
  if (!namePattern.test(name)) {
    return "이름에는 숫자/특수문자를 포함할 수 없습니다";
  }

  return "";
};

// 핸드폰 유효성 검사
export const validatePhone = (phone: string): string => {
  if (phone.trim() === "") 
    return "핸드폰 번호를 입력해주세요";

  // 숫자만 입력 가능
  const phonePattern = /^[0-9]+$/;
  if (!phonePattern.test(phone)) 
    return "숫자만 입력해주세요";

  // 길이 체크: 10~11자리
  if (phone.length < 10 || phone.length > 11) {
    return "핸드폰 번호 길이가 올바르지 않습니다";
  }

  // 시작 번호 체크: 010 또는 011만 허용
  if (!phone.startsWith("010") && !phone.startsWith("011")) {
    return "잘못된 핸드폰 번호입니다";
  }

  return "";
};

// 주소 선택사항 : 항상 에러 없음
export const validateAddress = (value: string): string => {
  return ""; 
};
