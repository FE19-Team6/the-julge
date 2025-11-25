import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import ClockIcon from "@/assets/clock.svg";
import LocationIcon from "@/assets/location.svg";
import Badge from "@/components/common/Badge/Badge";

export type CardProps = ComponentPropsWithoutRef<"article"> & {
  id: number; 
  name: string; 
  address1: string;
  imageUrl: string;
  startsAt: string;
  workhour: number;
  originalHourlyPay: number; // 기존 시급 (가게)
  hourlyPay: number; // 공고 시급 (지원자)
  status?: "accepted" | "rejected",
};

const CARD_BASE = `w-full border border-gray-20 
rounded-xl p-4 cursor-pointer transition-shadow hover:shadow-lg`

const CARD_DESIGN = {
  image: "h-[100px] md:h-[160px] lg:h-[170px]",
  shopName: "text-h3 text-black",
  info: "text-caption text-gray-40",
  price: "text-h3 md:text-h1 font-bold text-black",
  badgeText: "text-caption font-bold",
  icon: "shrink-0",
  infoRow: "flex items-center gap-2",
  priceRow: "flex flex-col sm:flex-row items-start sm:items-center gap-3",
  closedOverlay: "inset-0 bg-black/50", 
  closedText: "text-white text-h2 font-bold",
} as const;

// 시급 증가률 계산
const calculateBadge = (hourlyPay: number, originalHourlyPay: number) => {
  const increaseRate = ((hourlyPay - originalHourlyPay) / originalHourlyPay * 100)

  if (increaseRate <= 0) return null; 

  let variant: "increase" | "middle" | "ended";

   if (increaseRate >= 50) {
    variant = "increase";
  } else if (increaseRate >= 30) {
    variant = "middle";
  } else {
    variant = "ended";
  }
  
  return {
    variant,
    label: `기존 시급보다 ${Math.round(increaseRate)}%`,
  };
};

export default function Card({
  id,
  name,
  address1,
  imageUrl,
  originalHourlyPay,
  hourlyPay,
  startsAt,
  workhour,
  status,
  className,
  ...rest
}: CardProps) {
  const badge = calculateBadge(hourlyPay, originalHourlyPay);
  const isClosed = status === "accepted"; 

  return (
    <Link href={`/shop/${id}`} className="block">
      <article {...rest} className={clsx(CARD_BASE, className)}>
        <div className={clsx("relative w-full rounded-xl overflow-hidden", CARD_DESIGN.image)}>
          
           {/* 이미지 영역 */}
          {imageUrl ? (
            <Image src={imageUrl} alt={`${name} 가게 이미지`} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-20"/>
          )}

        {/* 공고가 마감 된 경우 이미지 dim 처리 */}  
        {isClosed && ( 
            <div className={clsx(CARD_DESIGN.closedOverlay, "absolute flex items-center justify-center")}>
              <span className={CARD_DESIGN.closedText}>마감 완료</span>
            </div>
)}
          
        </div>

         {/* 텍스트 정보 영역 */}
        <div className={clsx("mt-4 space-y-3", isClosed && "opacity-50")}>
          <h2 className={CARD_DESIGN.shopName}>{name}</h2>

           {/* 근무 시간 */}
          <div className={CARD_DESIGN.infoRow}>
            <ClockIcon className={clsx(CARD_DESIGN.icon, isClosed && "[&_path]:fill-gray-30")} />
            <p className={CARD_DESIGN.info}>{startsAt} ({workhour}시간)</p>
          </div>

          {/* 가게 위치 */}
          <div className={CARD_DESIGN.infoRow}>
            <LocationIcon className={clsx(CARD_DESIGN.icon, isClosed && "[&_path]:fill-gray-30")} />
            <p className={CARD_DESIGN.info}>{address1}</p>
          </div>

          {/* 시급 + 배지 */}
          <div className={CARD_DESIGN.priceRow}>
            <p className={CARD_DESIGN.price}>{hourlyPay.toLocaleString()}원</p>
            {badge && !isClosed ? (

              <Badge variant={badge.variant} className={CARD_DESIGN.badgeText}>
                {badge.label}  
              </Badge> ) : (
                 <div className="h-9"/>   
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}