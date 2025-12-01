import clsx from "clsx";
import { Application } from "@/src/features/profile/type";

type ApplicationCardProps = {
  application: Application;
};

/**
 * 신청 내역 카드 컴포넌트
 * - 테이블 행 형태로 표시
 */
export default function ApplicationCard({ application }: ApplicationCardProps) {
  // 상태별 스타일
  const getStatusStyle = (status: Application["status"]) => {
    switch (status) {
      case "accepted":
        return "bg-blue-10 text-blue-20";
      case "rejected":
        return "bg-red-10 text-red-50";
      case "canceled":
        return "bg-green-10 text-green-20";
      default: // pending
        return "bg-gray-20 text-gray-50";
    }
  };

  // 상태별 텍스트
  const getStatusText = (status: Application["status"]) => {
    switch (status) {
      case "accepted":
        return "승인완료";
      case "rejected":
        return "거절";
      case "canceled":
        return "대기중";
      case "pending":
        return "대기중";
    }
  };

  return (
    <div className={clsx(
      "grid grid-cols-[2fr_3fr_2fr_1fr]",
      "gap-4 py-4 px-6 border-b border-gray-20 hover:bg-gray-5",
      "items-center"
    )}>
      {/* 가게 */}
      <div className="text-body2">
        {application.shopName}
      </div>

      {/* 일자 */}
      <div className="text-body2 text-gray-50">
        {application.workDate} ({application.workHour}시간)
      </div>

      {/* 시급 */}
      <div className="text-body2">
        {application.hourlyPay.toLocaleString()}원
      </div>

      {/* 뱃지 상태 */}
      <div className="flex items-center">
        <span className={`px-3 py-1.5 rounded-md text-caption font-bold ${getStatusStyle(application.status)}`}>
          {getStatusText(application.status)}
        </span>
      </div>
    </div>
  );
}