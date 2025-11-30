"use client";

import { useState } from "react";
import FilterPanel from "./FilterPanel";
import Button from "@/src/components/common/Button/Button";
import { SortDropdown } from "./SortDropdown";

export const FilterGroup = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex gap-2 relative">
      {/* <SortDropdown /> */}
      <Button
        onClick={() => setIsFilterOpen(true)}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition "
      >
        상세 필터
      </Button>

      <FilterPanel open={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
};
