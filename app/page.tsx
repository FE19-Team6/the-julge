"use client";

import { useState } from "react";
import Header from "@/components/common/Header/Header";

export default function TestHeaderPage() {
  const [headerState, setHeaderState] = useState<"owner" | "worker" | "guest">(
    "owner"
  );

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header 테스트 */}
      <Header
        state={headerState}
        onLogout={() => setHeaderState("worker")}
        onOpenNotification={() => setIsNotificationOpen(true)}
      />

      {/* 본문 영역 */}
      <div className="p-10">
        <h1 className="text-2xl font-bold">Header 테스트 페이지</h1>

        {/* 상태 변경 버튼 */}
        <div className="mt-6 flex gap-3">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setHeaderState("owner")}
          >
            registering 상태
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setHeaderState("worker")}
          >
            login 상태
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setHeaderState("guest")}
          >
            signup 상태
          </button>
        </div>

        <pre className="mt-5 p-4 bg-white border rounded">
          {`현재 Header State: ${headerState}`}
        </pre>
      </div>

      {/* 알림 모달 테스트 */}
      {isNotificationOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">알림 모달</h2>
            <p>알림 내용 출력 영역</p>
            <button
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
              onClick={() => setIsNotificationOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
