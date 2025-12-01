// src/features/profile/components/ApplicationList.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/src/components/common/Button/Button";
import ApplicationCard from "./ApplicationCard";
import Pagination from "@/src/components/Pagination/Pagination";
import { Application } from "@/src/features/profile/type";

type ApplicationListProps = {
  applications: Application[];
};

const ITEMS_PER_PAGE = 5;

/*
 * 신청 내역 리스트 컴포넌트
 * - 신청 내역이 없으면 안내 메시지 표시
 * - 신청 내역이 있으면 테이블 형태로 표시
 * - 5개 이상일 때 페이지네이션 표시
*/
export default function ApplicationList({ applications }: ApplicationListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // 신청 내역이 없을 때
  if (applications.length === 0) {
    return (
      <div className="text-center py-12 border border-gray-20 rounded-xl bg-white">
        <p className="text-gray-50 text-body1 mb-6">
          아직 신청 내역이 없어요.
        </p>
        <Link href="/notices">
          <Button variant="primary" size="lg">
            공고 보러가기
          </Button>
        </Link>
      </div>
    );
  }

  // 페이지네이션 계산
  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentApplications = applications.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 스크롤을 목록 상단으로 이동
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 신청 내역이 있을 때
  return (
    <div className="space-y-4">
      <div className="border border-gray-20 rounded-xl overflow-hidden bg-white">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-[2fr_3fr_2fr_1fr] gap-4 py-3 px-6 bg-gray-10">
          <div className="text-body1 font-bold text-left">가게</div>
          <div className="text-body1 font-bold text-left">일자</div>
          <div className="text-body1 font-bold text-left">시급</div>
          <div className="text-body1 font-bold text-left">상태</div>
        </div>

        {/* 테이블 바디 */}
        <div>
          {currentApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      </div>

      {/* 페이지네이션 - 5개 이상일 때만 표시 */}
      {applications.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}