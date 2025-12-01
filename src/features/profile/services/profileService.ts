// 프로필 관련 API 호출 함수

import type { UpdateProfilePayload, Profile } from "@/src/features/auth/type";

/*
- 프로필 수정
*/
export async function updateProfile(payload: UpdateProfilePayload): Promise<Profile> {
  const res = await fetch("/api/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("프로필 저장 실패");
  }

  return res.json();
}

/*
- 프로필 조회
*/
export async function getProfile(): Promise<Profile | null> {
  const res = await fetch("/api/profile", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}