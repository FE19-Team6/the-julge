import { formatDate } from "@/src/lib/utils/formatDate";
import { calculatePayBadge } from "@/src/lib/utils/calculatePayBadge";

import type { NoticeDetailItem } from "./types";

export interface FlattenedNoticeDetail {
  id: string;
  storeName: string;
  address: string;
  imageUrl: string;
  startsAt: string;
  workhour: number;
  hourlyPay: number;
  originalHourlyPay: number;
  status: "accepted" | "rejected";
  shopId: string;
  description: string;
  badge: {
    variant: "increase" | "middle" | "ended";
    label: string;
  } | null;
}

export function mapNoticeDetail(item: NoticeDetailItem): FlattenedNoticeDetail {
  const shop = item.shop.item;

  return {
    id: item.id,
    storeName: shop.name,
    address: shop.address1,
    imageUrl: shop.imageUrl,
    startsAt: formatDate(item.startsAt),
    workhour: item.workhour,
    hourlyPay: item.hourlyPay,
    originalHourlyPay: shop.originalHourlyPay,
    status: item.closed ? "accepted" : "rejected",
    shopId: shop.id,
    description: item.description,
    badge: calculatePayBadge(item.hourlyPay, shop.originalHourlyPay),
  };
}
