import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ alertId: string }> }
) {
  try {
    const { alertId } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const userId = cookieStore.get("userId")?.value;

    if (!token || !userId) {
      return NextResponse.json({ error: "인증되지 않음" }, { status: 401 });
    }

    const response = await fetch(
      `${BACKEND_API_URL}/users/${userId}/alerts/${alertId}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) throw new Error("알림 처리 실패");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("알림 처리 실패:", error);
    return NextResponse.json({ error: "알림 처리 실패" }, { status: 500 });
  }
}
