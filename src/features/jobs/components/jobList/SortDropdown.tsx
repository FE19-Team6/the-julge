"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Dropdown from "@/src/components/common/Dropdown/Dropdown";

export type SortType = "time" | "pay" | "hour" | "shop";
const sortOtions = [
  { label: "마감임박순", value: "time" },
  { label: "시급많은순", value: "pay" },
  { label: "시간적은순", value: "hour" },
  { label: "가나다순", value: "shop" },
];
export const SortDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortType = (searchParams.get("sort") as SortType) || "time";
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);

    const keyword = searchParams.get("keyword");
    if (keyword) {
      params.set("keyword", keyword);
    }

    router.push(`/?${params.toString()}`);
  };
  return (
    <Dropdown
      className="h-10"
      value={sortType}
      options={sortOtions}
      onChangeValue={handleSortChange}
    />
  );
};
