/*
- 사용자 프로필 조회
*/
export async function getProfile(userId: string, token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, 
    {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    }
);

  if (!res.ok) throw new Error("프로필 정보 불러오기 실패");

  const data = await res.json();
  return data.item ?? null;
}