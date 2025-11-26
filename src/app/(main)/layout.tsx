"use client";

import Header, { HeaderState } from "@/src/components/common/Header/Header";

// 임시 유저 타입
type User = {
  type: "owner" | "worker";
} | null;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 안넣으면 오류생겨서 임시 유저 상태
  const user: User = null;

  const getHeaderState = (user: User): HeaderState => {
    if (!user) return "guest";
    return user.type === "owner" ? "owner" : "worker";
  };

  const headerState = getHeaderState(user); // ← 이거 추가!

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        state={headerState}
        onLogout={() => console.log("logout")}
        onOpenNotification={() => console.log("open notification")}
      />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 py-6">
        {children}
      </main>
      {/* 푸터 완성되면 아래 지우고 컴포넌트 교체 */}
      <footer className="w-full bg-gray-10 py-[37px] px-[238px] flex flex-col gap-2 text-gray-500 text-sm">
        <span>© THE JULGE</span>
      </footer>
    </div>
  );
}
