import NoticeDetailClient from "./NoticeDetailClient";
// 유진 수정 redirect 삭제 필요
import { redirect } from "next/navigation";
import { getToken } from "@/src/lib/utils/getCookies";
import { mapNoticeDetail } from "./mapper";

import type { NoticeDetailItem } from "./types";
import RecentViewedSection from "@/src/features/jobs/components/jobList/RecentViewedSection"; //유진 추가 최근에 본 공고 리스트
import SaveRecentNotice from "./SaveRecentNotice";

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
  // 유진 수정 공고 상세 일반인도 볼수있게
  //if (!token) redirect("/login");

  if (!shopId) {
    throw new Error("shopId가 필요합니다.");
  }

  const headers: HeadersInit = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // 유진 수정 공고 상세 일반인도 볼수있게
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

  return (
    <>
      {/* 유진 추가 로컬스토리지에 저장 */}
      <SaveRecentNotice noticeItem={data.item} />
      <NoticeDetailClient notice={notice} />
      {/* 유진 추가 최근에 본 공고 리스트 */}
      <RecentViewedSection />
    </>
  );
}
