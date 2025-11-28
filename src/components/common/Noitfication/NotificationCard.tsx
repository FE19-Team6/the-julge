"use clint";
import { formatDate } from "@/src/lib/utils/formatDate";
import { timeAgo } from "@/src/lib/utils/timeAgo";
import { Notification } from "./NotificationModal";

type NotificationCardProps = {
  item: Notification;
};

export default function NotificationCard({ item }: NotificationCardProps) {
  const timeText = timeAgo(item.createdAt);
  const color = item.result === "accepted" ? "text-blue-600" : "text-red-600";

  return (
    <div className="rounded-lg border border-gray-200 p-3 bg-white cursor-pointer">
      <div className="flex items-start gap-2">
        {/* 읽음 표시 */}
        <span
          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
            item.read ? "bg-gray-300" : "bg-blue-500"
          }`}
        />

        <div className="flex-1">
          <p className="text-sm leading-5 text-gray-800">
            <span className="font-medium">{item.shopName}</span>
            <span className="text-gray-500">
              ({formatDate(item.noticeTime)})
            </span>
            공고 지원이{" "}
            <span className={`font-semibold ${color}`}>
              {item.result === "accepted" ? "승인" : "거절"}
            </span>
            되었어요.
          </p>
          <p className="text-xs text-gray-400 mt-1">{timeText}</p>
        </div>
      </div>
    </div>
  );
}
