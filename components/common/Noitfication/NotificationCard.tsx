import { formatDate } from "@/src/lib/utils/formatDate";
import { timeAgo } from "@/src/lib/utils/timeAgo";
import { Notification } from "./NotificationModal";
import IcClosed from "@/assets/ic_close.svg";

type NotificationCardProps = {
  item: Notification;
  onDelete: (id: string) => void;
};

export default function NotificationCard({
  item,
  onDelete,
}: NotificationCardProps) {
  const timeText = timeAgo(item.createdAt);
  const color = item.result === "accepted" ? "text-blue-600" : "text-red-600";

  return (
    <div className="relative rounded-lg border border-gray-200 p-3 bg-white">
      {/* X 버튼 */}
      <button
        onClick={() => onDelete(item.id)}
        className="absolute top-2 right-2 cursor-pointer"
      >
        <IcClosed className="w-3 h-3 text-gray-400  hover:text-gray-600" />
      </button>

      <div className="flex items-start gap-2">
        {/* 읽음 표시 */}
        <span
          className={`w-2 h-2 rounded-full mt-2 ${
            item.read ? "bg-gray-300" : "bg-blue-500"
          }`}
        />

        <div className="flex-1 pr-4">
          {" "}
          {/* X버튼과 겹치지 않게 여백 */}
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
