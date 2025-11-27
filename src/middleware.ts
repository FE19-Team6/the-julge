import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // 보호된 페이지
  const protectedPaths = ["/jobs", "/mystore", "/profile"];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // 보호된 페이지 접근 시 토큰 확인
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 로그인 상태에서 로그인/회원가입 페이지 접근 시 홈으로
  if (
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/signup")) &&
    token
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 끝났으면 다음 흐름으로
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/jobs/:path*",
    "/mystore/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
  ],
};
