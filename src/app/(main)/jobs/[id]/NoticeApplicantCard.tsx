"use client";

import clsx from "clsx";
import Button from "@/src/components/common/Button/Button";
import { ApplicantItem } from "./types";

type Props = {
  applicant: ApplicantItem;
  isLoading: boolean;
  onApprove: () => void;
  onReject: () => void;
  onPending: () => void;
};

export default function NoticeApplicantCard({
  applicant,
  isLoading,
  onApprove,
  onReject,
  onPending,
}: Props) {
  const getStatusStyle = (status: ApplicantItem["status"]) => {
    switch (status) {
      case "approved":
        return "bg-blue-10 text-blue-50";
      case "rejected":
        return "bg-red-10 text-red-50";
      default:
        return "bg-gray-20 text-gray-50";
    }
  };

  const getStatusText = (status: ApplicantItem["status"]) => {
    switch (status) {
      case "approved":
        return "승인 완료";
      case "rejected":
        return "거절됨";
      default:
        return "대기중";
    }
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-4 gap-4 py-4 px-6",
        "border-b border-gray-20 bg-white hover:bg-gray-5"
      )}
    >
      {/* 신청자 */}
      <div className="text-body2 font-bold flex items-center justify-center h-full">
        {applicant.name || "이름 없음"}
      </div>

      {/* 소개 */}
      <div className="text-body2 text-gray-70 truncate flex items-center justify-center h-full">
        {applicant.message || "소개 없음"}
      </div>

      {/* 전화번호 */}
      <div className="text-body2 text-gray-70 flex items-center justify-center h-full">
        {applicant.phone || "-"}
      </div>

      {/* 상태 컬럼 */}
      <div className="flex items-center justify-center h-full">
        {applicant.status === "pending" && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isLoading}
              onClick={onReject}
            >
              거절하기
            </Button>

            <Button
              variant="approve"
              size="sm"
              disabled={isLoading}
              onClick={onApprove}
            >
              승인하기
            </Button>
          </div>
        )}

        {(applicant.status === "approved" ||
          applicant.status === "rejected") && (
          <span
            className={clsx(
              "px-3 py-1 rounded-md text-caption font-bold whitespace-nowrap",
              getStatusStyle(applicant.status)
            )}
          >
            {getStatusText(applicant.status)}
          </span>
        )}
      </div>
    </div>
  );
}
