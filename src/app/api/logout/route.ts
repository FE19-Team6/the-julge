import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // 쿠키 삭제
    cookieStore.delete("token");
    cookieStore.delete("userType");
    cookieStore.delete("userId");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "로그아웃 실패" },
      { status: 500 }
    );
  }
}
