import StoreDetailClient from "./storeDetailClient";
import { StoreDetailResponse, FlattenedStoreDetail } from "./types";
import { getToken } from "@/src/lib/utils/getCookies";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const token = await getToken();
  if (!token) throw new Error("로그인이 필요합니다.");

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

  // 🔥 타입 안전하게 response를 받는다
  const raw: StoreDetailResponse = await backendRes.json();

  // 🔥 평탄화 + 타입 보장
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

  return <StoreDetailClient store={store} />;
}
