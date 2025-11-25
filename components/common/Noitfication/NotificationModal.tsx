"use client";

import NotificationCard from "./NotificationCard";
import IcClosed from "@/assets/ic_close.svg";

export type Notification = {
  id: string;
  createdAt: string;
  shopName: string;
  noticeTime: string;
  result: "accepted" | "rejected";
  read: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  items: Notification[];
  onDeleteAlert: (id: string) => void;
};

const NotificationModal = ({ open, onClose, items, onDeleteAlert }: Props) => {
  if (!open) return null;

  return (
    <div
      className="
        absolute top-full right-0 mt-2
        w-[368px]
        h-[419px]        
        rounded-[10px]
        border border-gray-30
        bg-red-10 shadow
        flex flex-col
        overflow-hidden
      "
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center px-5 py-6 bg-red-10">
        <h2 className="text-lg font-semibold">알림 {items.length}개</h2>

        <button
          onClick={onClose}
          className="text-gray-600 hover:text-black text-xl cursor-pointer"
        >
          <IcClosed className="w-4 h-4" />
        </button>
      </div>

      {/* 리스트 (스크롤 영역) */}
      {/* 빈배열처리는 api훅에서 할예정 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar">
        {items.map((item) => (
          <NotificationCard
            key={item.id}
            item={item}
            onDelete={onDeleteAlert}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationModal;
