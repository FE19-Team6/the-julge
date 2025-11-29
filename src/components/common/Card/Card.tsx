import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

import ClockIcon from "@/assets/clock.svg";
import LocationIcon from "@/assets/location.svg";
import Badge from "@/src/components/common/Badge/Badge";
import NoData from "../NoData/NoData";
import { calculatePayBadge } from "@/lib/utils/calculatePayBadge";

export type CardProps = ComponentPropsWithoutRef<"article"> & {
  id: string;
  name: string;
  address1: string;
  imageUrl: string;
  startsAt: string;
  workhour: number;
  originalHourlyPay: number;
  hourlyPay: number;
  // 가게 주인이 accepted하면 공고마감 처리됨 (카드 disable + 섬네일 Nodata 적용)
  status?: "accepted" | "rejected";
};

// 공고 상태 상수 (문자 그대로 쓰지 않도록 정리)
const JOB_STATUS = {
  CLOSED: "accepted",
  OPEN: "rejected",
} as const;

// 공용 스타일 모음
const CARD_BASE = `
  w-full border border-gray-20 
  rounded-2xl p-4 cursor-pointer 
  transition-shadow hover:shadow-lg
`;

// 카드 디자인
const CARD_DESIGN = {
  image: "h-[100px] md:h-[160px] lg:h-[170px]",
  shopName: "text-h3 text-black",
  info: "text-caption text-gray-40",
  price: "text-h3 md:text-h1 font-bold text-black",
  badgeText: "text-caption font-bold",
  icon: "shrink-0",
  infoRow: "flex items-center gap-2",
  priceRow: "flex flex-col sm:flex-row items-start sm:items-center gap-3",
  closedOverlay: "inset-0",
} as const;

// 카드 컴포넌트
export default function Card({
  id,
  name,
  address1,
  imageUrl,
  startsAt,
  workhour,
  originalHourlyPay,
  hourlyPay,
  status,
  className,
  ...rest
}: CardProps) {
  // 공고가 마감된 상태인지 계산
  const isClosed = status === JOB_STATUS.CLOSED;

  // 시급 증가율 계산하고 뱃지 데이터 반환함
  const badge = calculatePayBadge(hourlyPay, originalHourlyPay);

  return (
    <Link
      href={`/shop/${id}`}
      className={clsx("block", isClosed && "pointer-events-none")}
    >
      <article
        {...rest}
        className={clsx(
          CARD_BASE,
          className,
          isClosed && "cursor-default hover:shadow-none"
        )}
      >
        {/* 이미지 영역 */}
        <div
          className={clsx(
            "relative w-full rounded-xl overflow-hidden",
            CARD_DESIGN.image,
            isClosed && "pointer-events-none"
          )}
        >
          {/* 이미지 */}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${name} 가게 이미지`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-20" />
          )}

          {/* 마감된 경우 화면 전체를 덮는 안내 UI */}
          {isClosed && (
            <div
              className={clsx(
                CARD_DESIGN.closedOverlay,
                "absolute flex items-center justify-center pointer-events-none"
              )}
            >
              <NoData
                title="마감된 공고"
                description="다른 공고를 찾아보세요"
                className="border-none mt-3"
                titleClassName="text-h3 font-bold"
                descriptionClassName="text-body1"
              />
            </div>
          )}
        </div>

        {/* 텍스트 영역 */}
        {/* 마감 시 흐리게 보이고 클릭 불가 처리 */}
        <div
          className={clsx(
            "mt-4 space-y-3",
            isClosed && "opacity-60 pointer-events-none"
          )}
        >
          {/* 가게명 */}
          <h2 className={CARD_DESIGN.shopName}>{name}</h2>

          {/* 근무시간 텍스트 + 아이콘 */}
          <div className={CARD_DESIGN.infoRow}>
            <ClockIcon
              className={clsx(
                CARD_DESIGN.icon,
                isClosed && "[&_path]:fill-gray-30"
              )}
            />
            <p className={CARD_DESIGN.info}>
              {startsAt} ({workhour}시간)
            </p>
          </div>

          {/* 위치 텍스트 + 아이콘 */}
          <div className={CARD_DESIGN.infoRow}>
            <LocationIcon
              className={clsx(
                CARD_DESIGN.icon,
                isClosed && "[&_path]:fill-gray-30"
              )}
            />
            <p className={CARD_DESIGN.info}>{address1}</p>
          </div>

          {/* 시급 + 증가율 뱃지 */}
          <div className={CARD_DESIGN.priceRow}>
            <p className={CARD_DESIGN.price}>{hourlyPay.toLocaleString()}원</p>

            {!isClosed && badge ? (
              <Badge variant={badge.variant} className={CARD_DESIGN.badgeText}>
                {badge.label}
              </Badge>
            ) : (
              /* 레이아웃 유지를 위한 빈 박스 */
              <div className="h-9" />
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
