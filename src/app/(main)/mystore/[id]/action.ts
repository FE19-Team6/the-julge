"use server";

import { cookies } from "next/headers";

export type NoticeWrapper = {
  item: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    closed: boolean;
  };
};

export type StoreNotice = {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  closed: boolean;
};

export async function getStoreNotices(
  shopId: string,
  offset: number = 0,
  limit: number = 6
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("로그인이 필요합니다.");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}/notices?offset=${offset}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("공고 목록을 불러오지 못했습니다.");

  const data = await res.json();

  // 완전 정확하게 NoticeWrapper → StoreNotice 변환
  const flatItems: StoreNotice[] = data.items.map(
    (raw: NoticeWrapper): StoreNotice => ({
      id: raw.item.id,
      hourlyPay: raw.item.hourlyPay,
      startsAt: raw.item.startsAt,
      workhour: raw.item.workhour,
      closed: raw.item.closed,
    })
  );

  return {
    items: flatItems,
    hasMore: flatItems.length === limit,
  };
}
