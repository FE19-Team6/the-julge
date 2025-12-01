"use client";

import DetailCardLayout from "@/src/components/layout/DetailCardLayout";
import NoData from "@/src/components/common/NoData/NoData";
import LinkButton from "@/src/components/common/Button/LinkButton";
import type { CardProps } from "@/src/components/common/Card/Card";

import { FlattenedStoreDetail } from "./types";
import InfiniteNoticeList from "./InfiniteNoticeList";

interface Props {
  store: FlattenedStoreDetail;
  notices: CardProps[];
  hasMore: boolean;
}

export default function StoreDetailClient({ store, notices, hasMore }: Props) {
  const hasPosts = notices.length > 0;

  return (
    <div className="w-full flex justify-center">
      {/* Figma: padding 60px 상하 / 238px 좌우 */}
      <div className="w-full max-w-[1600px] px-[238px] py-[60px] flex flex-col gap-[60px]">
        {/* 타이틀 */}
        <h1 className="text-xl font-bold">내 가게</h1>

        {/* 가게 상세 카드 (폭 제한 없음 → 패딩으로 UI 유지됨) */}
        <DetailCardLayout
          type="store"
          image={store.imageUrl}
          category={store.category}
          name={store.name}
          location={`${store.address1} ${store.address2}`}
          description={store.description}
          buttonSlot={
            <div className="flex gap-2">
              <LinkButton
                href={`/shops/${store.id}/edit`}
                variant="outline"
                size="md"
              >
                편집하기
              </LinkButton>

              <LinkButton
                href={`/jobs/create?shopId=${store.id}`}
                variant="primary"
                size="md"
                className="whitespace-nowrap"
              >
                공고 등록하기
              </LinkButton>
            </div>
          }
        />

        {/* 공고 영역 */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold">등록한 공고</h2>

          {!hasPosts ? (
            <NoData
              title="등록된 공고가 없어요."
              description="새로운 공고를 등록해보세요!"
              action={
                <LinkButton
                  href={`/jobs/create?shopId=${store.id}`}
                  variant="primary"
                  size="lg"
                >
                  공고 등록하기
                </LinkButton>
              }
            />
          ) : (
            <InfiniteNoticeList
              shopId={store.id}
              initialNotices={notices}
              initialHasMore={hasMore}
              store={{
                id: store.id,
                name: store.name,
                address1: store.address1,
                imageUrl: store.imageUrl,
                originalHourlyPay: store.originalHourlyPay,
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
}
