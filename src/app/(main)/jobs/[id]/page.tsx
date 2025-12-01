import NoticeDetailClient from "./NoticeDetailClient";
import { redirect } from "next/navigation";
import { getToken } from "@/src/lib/utils/getCookies";
import { mapNoticeDetail } from "./mapper";

import type { NoticeDetailItem } from "./types";

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
  if (!token) redirect("/login");

  if (!shopId) {
    throw new Error("shopId가 필요합니다.");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}/notices/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("공고 정보를 불러오지 못했습니다.");
  }

  const data: { item: NoticeDetailItem } = await res.json();
  const notice = mapNoticeDetail(data.item);

  return <NoticeDetailClient notice={notice} />;
}
