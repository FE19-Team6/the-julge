"use client";

import DetailCardLayout from "@/src/components/layout/DetailCardLayout";
import Badge from "@/src/components/common/Badge/Badge";
import LinkButton from "@/src/components/common/Button/LinkButton";
import Button from "@/src/components/common/Button/Button";
import Pagination from "@/src/components/Pagination/Pagination";
import { useState } from "react";
import type { ApplicantItem } from "./types";

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
  applicants?: ApplicantItem[];
  shopId: string;
}

export default function NoticeDetailClient({
  notice,
  applicants = [],
  shopId,
}: NoticeDetailProps) {
  const {
    storeName,
    hourlyPay,
    startsAt,
    workhour,
    description,
    imageUrl,
    address,
    badge,
    id,
  } = notice;

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.max(1, Math.ceil(applicants.length / pageSize));
  const paginatedApplicants = applicants.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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
        {/* 신청자 목록 */}
        <h2 className="text-lg font-semibold">신청자 목록</h2>

        <div className="w-full border rounded-xl overflow-hidden bg-white">
          {/* 테이블 헤더 */}
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 h-[52px] text-gray-700">
              <tr>
                <th className="px-4">신청자</th>
                <th className="px-4">소개</th>
                <th className="px-4">전화번호</th>
                <th className="px-4 w-[150px]">상태</th>
                <th className="px-4 w-[150px]">관리</th>
              </tr>
            </thead>

            <tbody>
              {applicants.length === 0 ? (
                <tr className="h-[72px] border-t">
                  <td colSpan={5} className="text-center text-gray-500 py-6">
                    아직 신청자가 없습니다.
                  </td>
                </tr>
              ) : (
                paginatedApplicants.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t h-[72px] align-middle text-gray-800"
                  >
                    <td className="px-4 font-medium">{item.name}</td>
                    <td className="px-4">{item.message}</td>
                    <td className="px-4">{item.phone}</td>
                    <td className="px-4">
                      <Badge
                        variant={
                          item.status === "approved" ? "success" : "pending"
                        }
                      >
                        {item.status === "approved" ? "승인됨" : "대기중"}
                      </Badge>
                    </td>
                    <td className="px-4 flex gap-2">
                      <Button variant="primary" size="sm">
                        승인하기
                      </Button>
                      <Button variant="outline" size="sm">
                        대기전환
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션은 데이터 있을 때만 표시 */}
        {applicants.length > 0 && (
          <Pagination current={page} total={totalPages} onChange={setPage} />
        )}
      </div>
    </div>
  );
}
