"use client";

import DetailCardLayout from "@/src/components/layout/DetailCardLayout";
import LinkButton from "@/src/components/common/Button/LinkButton";
import NoData from "@/src/components/common/NoData/NoData";

export default function StoreDetailPage() {
  const hasPosts = false;

  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full flex justify-center">
        <div className="w-full max-w-5xl px-4 flex flex-col mt-10">
          <h1 className="text-xl font-bold mb-6">내 가게</h1>

          <div className="*:border-none ">
            <DetailCardLayout
              type="store"
              image="/example.png"
              category="식당"
              name="도토리 식당"
              location="서울시 성북구"
              description="엄마의 손맛이 느껴지는 도토리묵 전문 식당. 건강한 재료와 정직한 맛을 느껴보세요."
            />
          </div>

          <div className="mt-12 flex flex-col gap-6">
            <h2 className="text-xl font-semibold">등록한 공고</h2>

            {!hasPosts ? (
              <NoData
                title="등록된 공고가 없어요."
                description="새로운 공고를 등록해보세요!"
                action={
                  <LinkButton
                    href="/mystore/post/create"
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
          </div>
        </div>
      </section>
    </div>
  );
}
