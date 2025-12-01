"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/src/components/Pagination/Pagination";

interface PaginationWrapperProps {
  current: number;
  total: number;
}

export default function PaginationWrapper({
  current,
  total,
}: PaginationWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center">
      <Pagination current={current} total={total} onChange={handlePageChange} />
    </div>
  );
}
