// 타입 스크립트 타입 정의하는 파일

/* 
- 회원가입 요청 데이터
*/ 
export interface SignupPayload {
  email: string;
  password: string;
  type: "employee" | "employer";
}

/* 
- 사용자 기본 정보
*/ 
export type User = {
  id: string;
  email: string;
  type: "employee" | "employer";
  name?: string;
  phone?: string;
};

/* 
- 로그인 API 응답
*/ 
export type LoginResponse = {
  item: {
    token: string;
    user: {
      item: User;
      href: string;
    };
  };
  links: [];
};

/* 
- 로그인 결과 (프론트엔드 내부 사용)
*/ 
export type LoginResult = {
  token: string;
  user: User;
};

/* 
- 프로필 정보 (조회용)
*/ 
export type Profile = {
  name: string | null;
  phone: string | null;
  address: string | null;
  bio: string | null;
};

/* 
- 프로필 조회 API 응답
*/ 
export type ProfileResponse = {
  item: Profile | null;
};

/* 
- 프로필 생성/수정 요청 payload
*/ 
export type UpdateProfilePayload = {
  name: string;
  phone: string;
  address: string;
  bio: string;
};
