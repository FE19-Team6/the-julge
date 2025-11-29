"use client";

import { useState } from "react";
import { getNotices, GetNoticesParams } from "../services/getNotices";
import { CardProps } from "@/src/components/common/Card/Card";

import { normalizeNoticeApiResponse } from "../services/normalizeNotice";
import { noticeToCard } from "../utils/noticeToCard";

export const useNotices = () => {
  const [notices, setNotices] = useState<CardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const axiosNotices = async (params?: GetNoticesParams) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1) API 원본 호출 (nested 구조)
      const raw = await getNotices(params);

      // 2) normalize로 Notice[]로 변환
      const normalized = normalizeNoticeApiResponse(raw);

      // 3) CardProps[]로 매핑
      const mapped = normalized.map(noticeToCard);

      // 4) 상태 업데이트
      setNotices(mapped);

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    notices,
    isLoading,
    error,
    axiosNotices,
  };
};
