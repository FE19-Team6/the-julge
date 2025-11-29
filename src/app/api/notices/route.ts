import { NextResponse } from "next/server";
import { getToken } from "@/src/lib/utils/getCookies";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { shopId, hourlyPay, workhour, startsAt, description } = body;

    if (!shopId) {
      return NextResponse.json(
        { ok: false, message: "shopId가 없습니다." },
        { status: 400 }
      );
    }

    const token = await getToken();

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const payload = {
      hourlyPay: Number(hourlyPay),
      workhour: Number(workhour),
      startsAt,
      description,
    };

    const url = `${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}/notices`;

    const backendRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const backendData = await backendRes.json().catch(() => {
      return null;
    });

    return NextResponse.json(backendData ?? { ok: backendRes.ok }, {
      status: backendRes.status,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { ok: false, message: "서버 오류" },
      { status: 500 }
    );
  }
}
