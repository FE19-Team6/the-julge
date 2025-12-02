import { redirect } from "next/navigation";
import Link from "next/link";
import { getToken, getUserId } from "@/src/lib/utils/getCookies";
import { getProfile } from "@/src/app/api/profile/getProfile";
import Button from "@/src/components/common/Button/Button";
import ProfileSummaryCard from "@/src/features/profile/components/ProfileSummaryCard";
import ApplicationList from "@/src/features/profile/components/ApplicationList";
import type { Profile } from "@/src/features/auth/type";
import type {
  Application,
  UserApplicationApiResponse,
} from "@/src/features/profile/type";

/**
 * 프로필이 비어있는지 확인
 * 모든 필드가 비어있으면 빈 프로필로 판단
 */
function isEmptyProfile(profile: Profile | null): boolean {
  if (!profile) return true;
  return !profile.name && !profile.phone && !profile.address && !profile.bio;
}

/**
 * 프로필 조회 페이지 (서버 컴포넌트)
 * - 인증된 사용자만 접근 가능
 * - 프로필이 없으면 등록 안내 화면
 * - 프로필이 있으면 프로필 카드 + 신청 내역 표시
 */
export default async function Page() {
  // 인증 체크
  const token = await getToken();
  if (!token) redirect("/login");

  const userId = await getUserId();
  if (!userId) redirect("/login");

  // 프로필 조회
  const profile = await getProfile(userId, token);

  // 프로필이 없으면 등록 안내 화면
  if (isEmptyProfile(profile)) {
    return (
      <div className="w-full mt-15">
        <div className="w-full max-w-[964px] mx-auto px-4 md:px-6 lg:px-0 space-y-8">
          <h1 className="text-h2">내 프로필</h1>

          <div className="text-center py-12 border border-gray-20">
            <p className="text-gray-50 text-body1 mb-6">
              내 프로필을 등록하고 원하는 가게에 지원해 보세요.
            </p>

            <Link href="/profile/create">
              <Button variant="primary" size="lg">
                내 프로필 등록하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  let applications: Application[] = [];

  try {
    const applicationsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/applications`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (applicationsRes.ok) {
      const data: UserApplicationApiResponse = await applicationsRes.json();

      applications =
        data.items?.map((item) => ({
          id: item.item.id,
          shopName: item.item.shop.item.name,
          workDate: item.item.notice.item.startsAt,
          workHour: item.item.notice.item.workhour,
          hourlyPay: item.item.notice.item.hourlyPay,
          status: item.item.status,
        })) || [];
    }
  } catch (error) {
    console.error("신청 내역 조회 실패:", error);
  }

  // 프로필 카드 + 신청 내역 표시
  return (
    <div className="w-full max-w-[964px] mx-auto mt-15 px-4 md:px-6 lg:px-0 space-y-15">
      {/* 프로필 카드 */}
      <div className="flex flex-col gap-6 md:flex-row items-start md:gap-15">
        <h1 className="text-h2 whitespace-nowrap md:mb-0">내 프로필</h1>

        <div className="flex-1 w-full">
          <ProfileSummaryCard profile={profile} />
        </div>
      </div>

      {/* 신청 내역 섹션 */}
      <div>
        <h2 className="text-h2 text-black mb-6">신청 내역</h2>
        <ApplicationList applications={applications} />
      </div>
    </div>
  );
}
