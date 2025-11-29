import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/token", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  // ← 여기만 수정: 백엔드 응답을 그대로 반환
  const response = NextResponse.json(data);

  // 토큰 저장
  response.cookies.set("token", data.item.token, {
    httpOnly: true,
    path: "/",
  });

  // 유저 타입 저장
  response.cookies.set("userType", data.item.user.item.type, {
    httpOnly: false, // 클라이언트에서 읽을수 있게
    path: "/",
  });

  // 추가: 유저 아이디 저장
  response.cookies.set("userId", data.item.user.item.id, {
    httpOnly: true,
    path: "/",
  });

  // 유저 주소 저장
  response.cookies.set("userAddress", data.item.user.item.address, {
    httpOnly: false,
    path: "/",
  });

  return response;
}
