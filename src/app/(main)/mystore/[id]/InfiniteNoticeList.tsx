"use client";

import { useState, useEffect, useRef } from "react";
import CardList from "@/src/components/common/Card/CardList";
import type { CardProps } from "@/src/components/common/Card/Card";
import { getStoreNotices, StoreNotice } from "./action";
import { storeNoticeToCard } from "@/src/features/stores/utils/storeNoticeToCard";

interface Props {
  shopId: string;
  initialNotices: CardProps[];
  initialHasMore: boolean;

  store: {
    id: string;
    name: string;
    address1: string;
    imageUrl: string;
    originalHourlyPay: number;
  };
}

export default function InfiniteNoticeList({
  shopId,
  initialNotices,
  initialHasMore,
  store,
}: Props) {
  const [notices, setNotices] = useState<CardProps[]>(initialNotices);
  const [offset, setOffset] = useState(initialNotices.length);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer로 무한 스크롤
  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setIsLoading(true);

          try {
            const result = await getStoreNotices(shopId, offset, 6);

            setNotices((prev) => {
              const newItems = result.items.map((raw: StoreNotice) =>
                storeNoticeToCard(raw, store)
              );
              const merged = [...prev, ...newItems];
              const unique = merged.filter(
                (item, index, self) =>
                  index === self.findIndex((t) => t.id === item.id)
              );
              return unique;
            });
            setOffset((prev) => prev + result.items.length);
            setHasMore(result.hasMore);
          } catch (error) {
            console.error("공고 로딩 실패:", error);
          } finally {
            setIsLoading(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [shopId, offset, hasMore, isLoading]);

  return (
    <>
      <CardList items={notices} />

      {/* 로딩 트리거 */}
      {hasMore && (
        <div
          ref={observerRef}
          className="h-20 flex items-center justify-center"
        >
          {isLoading && <div className="text-gray-500">로딩 중...</div>}
        </div>
      )}
    </>
  );
}
