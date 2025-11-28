"use client";

import Image from "next/image";
import DetailCardLayout from "@/src/components/layout/DetailCardLayout";
import NoData from "@/src/components/common/NoData/NoData";
import LinkButton from "@/src/components/common/Button/LinkButton";
import locationIcon from "@/src/assets/location.svg";

import { FlattenedStoreDetail } from "./types";

interface Props {
  store: FlattenedStoreDetail;
}

export default function StoreDetailClient({ store }: Props) {
  const hasPosts = false;

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
                  href={`/mystore/${store.id}/post/create`}
                  variant="primary"
                  size="lg"
                >
                  공고 등록하기
                </LinkButton>
              }
            />
          ) : (
            <div>공고 리스트 들어갈 자리</div>
          )}
        </section>
      </div>
    </div>
  );
}
