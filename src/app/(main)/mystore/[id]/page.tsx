import StoreDetailClient from "./storeDetailClient";
import {
  StoreDetailResponse,
  FlattenedStoreDetail,
  NoticesResponse,
} from "./types";
import { getToken } from "@/src/lib/utils/getCookies";
import { redirect } from "next/navigation";
import { mapNoticeListToCardProps } from "./mapper";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const token = await getToken();
  if (!token) {
    return redirect("/login");
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shops/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!backendRes.ok) {
    console.error("STATUS:", backendRes.status);
    throw new Error("가게 정보를 불러오지 못했습니다.");
  }

  const raw: StoreDetailResponse = await backendRes.json();

  const item = raw.item;

  const store: FlattenedStoreDetail = {
    id: item.id,
    name: item.name,
    category: item.category,
    address1: item.address1,
    address2: item.address2,
    description: item.description,
    imageUrl: item.imageUrl,
    originalHourlyPay: item.originalHourlyPay,
    user: item.user.item,
  };

  const noticesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/shops/${id}/notices`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!noticesRes.ok) {
    console.error("NOTICE STATUS:", noticesRes.status);
    throw new Error("공고 리스트를 불러오지 못했습니다.");
  }

  const noticesJson: NoticesResponse = await noticesRes.json();
  const rawNotices = noticesJson.items;

  const notices = mapNoticeListToCardProps(rawNotices, store);

  return <StoreDetailClient store={store} notices={notices} />;
}
