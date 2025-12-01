import { redirect } from "next/navigation";
import { getToken, getUserId } from "@/src/lib/utils/getCookies";
import ProfileCreateClient from "./ProfileCreateClient";
import type { Profile } from "@/src/features/auth/type";
import { getProfile } from "@/src/app/api/profile/getProfile";

// 프로필이 비어있는지 확인하는 함수 (모두 비어있으면 빈 프로필로 판단함)
function isEmptyProfile(profile: Profile | null): boolean {
  if (!profile) return true;
  return (
    !profile.name &&
    !profile.phone &&
    !profile.address &&
    !profile.bio
  );
}

/* 
- 프로필이 생성 페이지 (서버 컴포넌트)
- 인증된 사용자만 접근할 수 있고, 프로필이 이미 존재하면 수정 페이지로 리다이렉트
- 프로필이 없으면 생성 폼 표시
*/
export default async function Page() {
  // 인증 체크
  const token = await getToken();
  if (!token) redirect("/login");

  const userId = await getUserId();
  if (!userId) redirect("/login");

  // 프로필 조회
  const profile = await getProfile(userId, token);

  // 프로필이 비어있지 않으면 edit 페이지로 보냄
  if (!isEmptyProfile(profile)) {
    redirect("/profile/edit");
  }

  // 프로필이 비어있으면 생성 폼 표시
  return <ProfileCreateClient />;
}
