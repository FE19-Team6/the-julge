import { getToken } from "@/src/lib/utils/getCookies";
import { NextResponse } from "next/server";

/**
 * 클라이언트에서 토큰이 필요할 때 호출하는 API
 * httpOnly 쿠키에서 토큰을 읽어서 반환
 */
export async function GET() {
  // 쿠키에서 토큰 가져오기
  const token = await getToken();

  // 토큰이 없으면 401 에러
  if (!token) {
    return NextResponse.json({ error: "인증되지 않음" }, { status: 401 });
  }

  // 토큰 반환
  return NextResponse.json({ token });
}
