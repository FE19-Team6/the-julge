import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

//env 넣었는데 왜 인식이 안되는거지? 여기도 넣었습니다.
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "인증되지 않음" }, { status: 401 });
    }

    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({ error: "사용자 ID 없음" }, { status: 400 });
    }

    // Query Parameters
    const { searchParams } = new URL(request.url);
    const offset = searchParams.get("offset");
    const limit = searchParams.get("limit");

    const params = new URLSearchParams();
    if (offset) params.append("offset", offset);
    if (limit) params.append("limit", limit);

    // 백엔드 API 호출
    const response = await fetch(
      `${BACKEND_API_URL}/users/${userId}/alerts?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("알림 조회 실패");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("알림 조회 실패:", error);
    return NextResponse.json({ error: "알림 조회 실패" }, { status: 500 });
  }
}
