"use client";

import DetailCardLayout from "@/src/components/layout/DetailCardLayout";

import Badge from "@/src/components/common/Badge/Badge";
import LinkButton from "@/src/components/common/Button/LinkButton";

interface Applicant {
  id: string;
  name: string;
  message: string;
  phone: string;
  status: "pending" | "approved";
}

interface NoticeDetailProps {
  notice: {
    id: string;
    storeName: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    imageUrl: string;
    address: string;
    badge: {
      variant: "increase" | "middle" | "ended";
      label: string;
    } | null;
  };
  applicants?: Applicant[];
}

export default function NoticeDetailClient({ notice }: NoticeDetailProps) {
  const {
    storeName,
    hourlyPay,
    startsAt,
    workhour,
    description,
    imageUrl,
    address,
    badge,
  } = notice;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1600px] px-[238px] py-[60px] flex flex-col gap-[60px]">
        <h1 className="text-xl font-bold">{storeName}</h1>

        {/* 공고 상세 카드 */}
        <DetailCardLayout
          type="wage"
          image={imageUrl}
          wage={hourlyPay}
          time={`${startsAt} · ${workhour}시간`}
          location={address}
          description={description}
          badgeSlot={
            badge ? <Badge variant={badge.variant}>{badge.label}</Badge> : null
          }
          buttonSlot={
            <LinkButton
              href={`/jobs/${notice.id}/edit`}
              variant="outline"
              size="full"
            >
              편집하기
            </LinkButton>
          }
        />

        {/* 공고 설명 */}
        <div className="w-full bg-gray-10 rounded-xl p-6 text-black leading-relaxed">
          <h2 className="text-lg font-semibold mb-2">공고 설명</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
