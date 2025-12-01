import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/*
- 인증 정보 검증
- token과 userId 또는 에러 정보
*/
function validateAuth(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userId = req.cookies.get("userId")?.value;

  if (!token) return { error: "로그인이 필요합니다.", status: 401 };
  if (!userId) return { error: "유저 정보를 찾을 수 없습니다.", status: 400 };

  return { token, userId };
}

/*
- 백엔드 응답을 안전하게 파싱함 (에러로 서버가 죽는 걸 방지하는 안전장치)
*/
async function safeParseResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

/*
- GET: 프로필 조회
*/
export async function GET(req: NextRequest) {
  const auth = validateAuth(req);

  if ("error" in auth) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }

  const backendRes = await fetch(`${BASE_URL}/users/${auth.userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  const data = await safeParseResponse(backendRes);
  const item = data?.item ?? null;

  return NextResponse.json(item, { status: backendRes.status });
}

/*
- PUT: 프로필 조회
*/
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const auth = validateAuth(req);

    if ("error" in auth) {
      return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    const backendRes = await fetch(`${BASE_URL}/users/${auth.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await safeParseResponse(backendRes);

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}