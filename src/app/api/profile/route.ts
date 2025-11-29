import { NextRequest, NextResponse } from "next/server";

/* 
 * 브라우저에서 보낸 프로필 업데이트 요청을 받아서 넥스트.js 서버가 대신
 * 백엔드 API로 보낸 후 결과를 다시 브라우저에 전달하는 역할을 함
 */
export async function PUT(req: NextRequest) {
  // 요청한 본문을 파싱함
  const body = await req.json();

  // 쿠키에서 token/userId 추출해 인증 확인
  const token = req.cookies.get("token")?.value;
  const userId = req.cookies.get("userId")?.value;

  // 토큰이나 사용자 ID가 없으면 401, 400 에러를 반환함
  if (!token) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { message: "유저 정보를 찾을 수 없습니다." },
      { status: 400 }
    );
  }

  // 백엔드 명세서: /users/{user_id}에 토큰을 Authorization 헤더에 담아 PUT 요청 전달
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  // 백엔드 응답을 상태 코드와 함께 클라이언트에 반환
  return NextResponse.json(data, { status: res.status });
}