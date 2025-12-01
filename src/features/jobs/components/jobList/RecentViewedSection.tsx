"use client";

import { useState, useEffect } from "react";
import CardList from "@/src/components/common/Card/CardList";
import { Notice } from "../../type";
import { noticeToCard } from "../../utils/noticeToCard";
import { recentNoticesStorage } from "../../utils/recentNotices";

export default function RecentViewedSection() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    // 로컬스토리지에서 불러오기
    setNotices(recentNoticesStorage.get());
  }, []);

  if (notices.length === 0) {
    return null; // 또는 빈 상태 메시지
  }

  const cardData = notices.map(noticeToCard);

  return (
    <section className="w-full py-[60px]">
      <div className="max-w-[964px] mx-auto">
        <h2 className="text-h2 mb-6">최근 본 공고</h2>
        <CardList items={cardData} />
      </div>
    </section>
  );
}
