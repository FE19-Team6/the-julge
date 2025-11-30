"use client";

import { useState } from "react";
import FilterPanel from "./FilterPanel";
import Button from "@/src/components/common/Button/Button";
import { SortDropdown } from "./SortDropdown";

export const FilterGroup = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex gap-2 relative">
      <SortDropdown />
      <Button
        variant="custom"
        onClick={() => setIsFilterOpen(true)}
        className="w-[130px] mt-1 bg-red-30 px-4 py-2 rounded-lg hover:text-white text-white hover:border-none cursor-pointer"
      >
        상세 필터
      </Button>

      <FilterPanel open={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
};
