"use client";

import clsx from "clsx";
import IcPaginationPrev from "@/assets/ic_pagination_prev.svg";
import IcPaginationNext from "@/assets/ic_pagination_next.svg";

type PaginationProps = {
  current: number;
  total: number;
  onChange: (page: number) => void;
  maxVisible?: number;
};

const PAGINATION_BUTTON_BASE = `
  w-10 h-10 rounded-[4px] 
  flex items-center justify-center
  text-[14px] font-[var(--weight-body2)]
  cursor-pointer
`;

const PAGINATION_BUTTON_VARIANTS = {
  active: "bg-red-30 text-white",
  inactive: "text-black hover:bg-gray-10",
};

const ARROW_BUTTON_BASE = `
  w-6 h-6 
  flex items-center justify-center
`;

// <Pagination current={page} total={10} onChange={} />
export default function Pagination({
  current,
  total,
  onChange,
  maxVisible = 5,
}: PaginationProps) {
  const getVisiblePages = () => {
    // 전체 페이지가 보여질 갯수보다 적으면 다 보여주기
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    //현재 페이지 중심으로 좌우 개수 계산
    // maxVisible=5 → half=2 (좌우로 2개씩, 중심 1개)
    const half = Math.floor(maxVisible / 2);
    //시작 페이지 계산: 현재에서 half만큼 뒤로 (1은 음수방지)
    let start = Math.max(1, current - half);
    // 끝은 중간값 + (처음부 중간값 - 1)
    const end = Math.min(total, start + maxVisible - 1);

    //만약에 끝이 토탈한다면 시작점 변경 (+1)
    if (end === total) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center gap-4 py-4">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current <= 1}
        aria-label="이전 페이지"
        className={clsx(
          ARROW_BUTTON_BASE,
          current <= 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        )}
      >
        <IcPaginationPrev width={14} height={14} />
      </button>

      <div className="flex items-center gap-2">
        {visiblePages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-label={`${p}페이지`}
            className={clsx(
              PAGINATION_BUTTON_BASE,
              p === current
                ? PAGINATION_BUTTON_VARIANTS.active
                : PAGINATION_BUTTON_VARIANTS.inactive
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onChange(current + 1)}
        disabled={current >= total}
        aria-label="다음 페이지"
        className={clsx(
          ARROW_BUTTON_BASE,
          current >= total ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
        )}
      >
        <IcPaginationNext width={14} height={14} />
      </button>
    </div>
  );
}
