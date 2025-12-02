"use client";

import NoticeApplicantCard from "./NoticeApplicantCard";
import { ApplicantItem } from "./types";
import Pagination from "@/src/components/Pagination/Pagination";

interface Props {
  applicants: ApplicantItem[];
  page: number;
  pageSize?: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;

  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onPending: (id: string) => void;
}

export default function NoticeApplicantList({
  applicants,
  page,
  pageSize = 5,
  isLoading,
  onPageChange,
  onApprove,
  onReject,
  onPending,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(applicants.length / pageSize));
  const paginated = applicants.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white">
      {/* Header */}
      <div
        className="
          hidden md:grid
          md:grid-cols-[1.5fr_2fr_1.5fr_1.5fr]
          place-items-center
          gap-4 py-3 px-6
          bg-gray-10
          text-body2 font-bold text-gray-70
        "
      >
        <div>신청자</div>
        <div>소개</div>
        <div>전화번호</div>
        <div>상태</div>
      </div>

      {/* List */}
      <div>
        {paginated.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            아직 신청자가 없습니다.
          </div>
        ) : (
          paginated.map((applicant) => (
            <NoticeApplicantCard
              key={applicant.id}
              applicant={applicant}
              isLoading={isLoading}
              onApprove={() => onApprove(applicant.id)}
              onReject={() => onReject(applicant.id)}
              onPending={() => onPending(applicant.id)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {applicants.length > pageSize && (
        <div className="flex justify-center py-4">
          <Pagination
            current={page}
            total={totalPages}
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
