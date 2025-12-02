import NoticeDetailClient from "./NoticeDetailClient";
import { redirect } from "next/navigation";
import { getToken, getUserType, getUserId } from "@/src/lib/utils/getCookies";
import { mapNoticeDetail } from "./mapper";
import type { NoticeDetailItem, ApplicantItem } from "./types";
import SaveRecentNotice from "./SaveRecentNotice";
import RecentViewedSection from "@/src/features/jobs/components/jobList/RecentViewedSection";

// 🔥 추가: API 응답 타입
interface ApplicationApiItem {
  item: {
    id: string;
    status: "pending" | "approved" | "rejected" | "canceled";
    user: {
      item: {
        id: string;
        name?: string;
        bio?: string;
        phone?: string;
      };
    };
  };
}

interface ApplicationsApiResponse {
  items: ApplicationApiItem[];
}

export default async function NoticeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ shopId?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;

  const { id } = resolvedParams;
  const shopId = resolvedSearch?.shopId ?? null;

  const token = await getToken();

  const userType = await getUserType(); // 추가
  const userId = await getUserId(); // 추가

  if (!shopId) {
    throw new Error("shopId가 필요합니다.");
  }

  // 토큰 있을 때만 Authorization 헤더
  const headers: HeadersInit = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}/notices/${id}`,
    {
      headers,
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("공고 정보를 불러오지 못했습니다.");
  }

  const data: { item: NoticeDetailItem } = await res.json();
  const notice = mapNoticeDetail(data.item);

  let applicants: ApplicantItem[] = [];
  let hasApplied = false;
  let applicationId: string | undefined;

  if (token) {
    // 조건문
    const applicantsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}/notices/${id}/applications`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (applicantsRes.ok) {
      const applicantsData: ApplicationsApiResponse =
        await applicantsRes.json();

      applicants =
        applicantsData.items?.map((item: ApplicationApiItem) => ({
          id: item.item.id,
          name: item.item.user.item.name || "이름 없음",
          message: item.item.user.item.bio || "소개 없음",
          phone: item.item.user.item.phone || "-",
          status: item.item.status,
        })) || [];

      const myApplication = applicantsData.items?.find(
        (item: ApplicationApiItem) => item.item.user.item.id === userId
      );

      if (myApplication && myApplication.item.status !== "canceled") {
        hasApplied = true;
        applicationId = myApplication.item.id;
      }
    }
  } //  if (token) 닫기
  return (
    <>
      {/* 로컬스토리지에 저장 */}
      <SaveRecentNotice noticeItem={data.item} />

      <NoticeDetailClient
        notice={notice}
        applicants={applicants}
        shopId={shopId}
        userType={userType}
        hasApplied={hasApplied}
        applicationId={applicationId}
      />

      {/* 추가: 최근 본 공고 리스트 */}
      {userType === "employee" && <RecentViewedSection />}
    </>
  );
}
