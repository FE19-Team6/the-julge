import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/token", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  const response = NextResponse.json({
    ok: true,
    userType: data.item.user.item.type, // 유저 타입 반환
  });

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

  return response;
}
