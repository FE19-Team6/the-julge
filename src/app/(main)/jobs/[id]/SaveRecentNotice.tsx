"use client";

import { useEffect } from "react";
import { recentNoticesStorage } from "@/src/features/jobs/utils/recentNotices";
import type { NoticeDetailItem } from "./types";

// NoticeDetailItem을 Notice 타입으로 변환
function convertToNotice(item: NoticeDetailItem) {
  return {
    id: item.id,
    hourlyPay: item.hourlyPay,
    startsAt: item.startsAt,
    workhour: item.workhour,
    description: item.description,
    closed: item.closed,
    shop: {
      id: item.shop.item.id,
      name: item.shop.item.name,
      category: item.shop.item.category,
      address1: item.shop.item.address1,
      address2: item.shop.item.address2,
      imageUrl: item.shop.item.imageUrl,
      originalHourlyPay: item.shop.item.originalHourlyPay,
    },
  };
}

export default function SaveRecentNotice({
  noticeItem,
}: {
  noticeItem: NoticeDetailItem;
}) {
  useEffect(() => {
    const notice = convertToNotice(noticeItem);
    recentNoticesStorage.add(notice);
  }, [noticeItem]);

  return null;
}
