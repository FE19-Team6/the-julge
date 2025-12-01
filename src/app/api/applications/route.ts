import { NextResponse } from "next/server";
import { getToken } from "@/src/lib/utils/getCookies";

export async function PUT(req: Request) {
  const token = await getToken();
  if (!token) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // 클라이언트에서 보낸 body
  const { shopId, noticeId, applicationId, status } = await req.json();

  if (!shopId || !noticeId || !applicationId || !status) {
    return NextResponse.json(
      { ok: false, message: "필수 값이 누락되었습니다." },
      { status: 400 }
    );
  }

  // 실제 백엔드에 PUT 전송
  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await backendRes.json();

  return NextResponse.json(data, { status: backendRes.status });
}
