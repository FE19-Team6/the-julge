import StoreDetailClient from "./storeDetailClient";
import { StoreDetailResponse, FlattenedStoreDetail } from "./types";
import { getToken } from "@/src/lib/utils/getCookies";
import { redirect } from "next/navigation";

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

  return <StoreDetailClient store={store} />;
}
