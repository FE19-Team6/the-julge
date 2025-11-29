// src/lib/auth/getUser.ts
import { cookies } from "next/headers";

/**
 * 서버 컴포넌트에서 쿠키에 저장된 토큰을 가져옵니다
 * 서버 컴포넌트만 사용가능, 클라이언트 컴포넌트는 useToken 훅을 사용해주세요.
 * @returns token 문자열 또는 undefined
 *
 * 사용 예시:
 * const token = await getToken();
 * // 백엔드 API 호출 시 Authorization 헤더에 사용
 */
export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

/**
 * 서버 컴포넌트에서 쿠키에 저장된 유저 타입을 가져옵니다
 * 서버 컴포넌트, 클라이언트 컴포넌트 둘 다 사용가능
 * @returns 'employee' | 'employer' | undefined
 *
 * 사용 예시:
 * const userType = await getUserType();
 * // 헤더 UI 분기 처리에 사용
 */
export async function getUserType() {
  const cookieStore = await cookies();
  return cookieStore.get("userType")?.value as
    | "employee"
    | "employer"
    | undefined;
}

// 유저 Id 가져오기: 서버 컴포넌트만 사용가능, 클라이언트에서 사용하고싶으시면 훅을 만들어주세요.
export async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("userId")?.value;
}

// 유저 주소 가져오기: 서버 컴포넌트, 클라이언트 컴포넌트 둘 다 사용가능
export async function getUserAddress() {
  const cookieStore = await cookies();
  return cookieStore.get("userAddress")?.value;
}
