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
        return "지원취소";
      case "pending":
        return "대기중";
    }
  };

  return (
    <div
      className={clsx(
        // 모바일: 세로 정렬, 태블릿 이상: 가로 그리드
        "flex flex-col gap-2 md:grid md:grid-cols-[2fr_3fr_2fr_1fr] md:gap-4",
        "py-4 px-4 md:px-6",
        "border-b border-gray-20 hover:bg-gray-5",
        "md:items-center"
      )}
    >
      {/* 모바일: 가게명 + 배지 한 줄 */}
      <div className="flex justify-between items-center md:contents">
        {/* 가게 */}
        <div className="text-body2 font-bold md:font-normal">
          {application.shopName}
        </div>

        {/* 모바일: 상태 배지 */}
        <div className="md:hidden">
          <span
            className={`px-2 py-1 rounded-md text-caption font-bold whitespace-nowrap ${getStatusStyle(application.status)}`}
          >
            {getStatusText(application.status)}
          </span>
        </div>
      </div>

      {/* 모바일: 시급 (왼쪽 정렬) */}
      <div className="text-body2 md:hidden">
        {application.hourlyPay.toLocaleString()}원
      </div>

      {/* 일자 */}
      <div className="text-body2 text-gray-50">
        {application.workDate} ({application.workHour}시간)
      </div>

      {/* 데스크톱: 시급 */}
      <div className="hidden md:block text-body2">
        {application.hourlyPay.toLocaleString()}원
      </div>

      {/* 데스크톱: 상태 배지 */}
      <div className="hidden md:flex items-center">
        <span
          className={`px-3 py-1 rounded-md text-caption font-bold whitespace-nowrap ${getStatusStyle(application.status)}`}
        >
          {getStatusText(application.status)}
        </span>
      </div>
    </div>
  );
}
