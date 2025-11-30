"use client";

import { useState } from "react";
import IcClosed from "@/assets/ic_close.svg";
import Input from "@/src/components/common/Input/Input";
import { addressOptions } from "@/src/features/stores/constants/adressOptions";
import Button from "@/src/components/common/Button/Button";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function FilterPanel({ open, onClose }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  //새로 고침해도 유지하게 URL에서 주소 파라미터를 읽어와서 초기값으로 설정
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    searchParams
      .get("address")
      ?.split(",")
      .map((loc) => decodeURIComponent(loc)) || []
  );
  const [startDate, setStartDate] = useState(
    searchParams.get("startsAtGte") || ""
  );
  const [minPay, setMinPay] = useState(searchParams.get("hourlyPayGte") || "");
  if (!open) return null;

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const removeLocation = (location: string) => {
    setSelectedLocations((prev) => prev.filter((l) => l !== location));
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("address");

    // 위치
    if (selectedLocations.length > 0) {
      params.set("address", selectedLocations.join(","));
    } else {
      params.delete("address");
    }

    // 시작일
    if (startDate) {
      params.set("startsAtGte", startDate);
    } else {
      params.delete("startsAtGte");
    }

    // 금액
    if (minPay) {
      params.set("hourlyPayGte", minPay);
    } else {
      params.delete("hourlyPayGte");
    }

    router.push(`/?${params.toString()}`);
    onClose();
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("address");
    params.delete("startsAtGte");
    params.delete("hourlyPayGte");

    router.push(`/?${params.toString()}`);
    onClose();
    setSelectedLocations([]);
    setStartDate("");
    setMinPay("");
  };

  return (
    <div
      className="
        absolute top-10 right-0 mt-2
        w-[390px]
        rounded-[10px]
        border border-gray-30
        bg-white shadow
        flex flex-col
        overflow-hidden
        z-50
      "
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center px-5 py-6">
        <h2 className="text-h3 font-semibold">상세 필터</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-black cursor-pointer"
        >
          <IcClosed className="w-4 h-4" />
        </button>
      </div>

      {/* 내용 (스크롤 영역) */}
      <div className="flex-1 overflow-y-auto px-5 space-y-6">
        {/* 위치 */}
        <div>
          <h3 className="text-p font-medium mb-3">위치</h3>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-20 rounded p-2 scrollbar">
            {addressOptions.map((location) => (
              <Button
                key={location.value}
                variant="custom"
                size="address"
                onClick={() => toggleLocation(location.value)}
                className={`px-3 py-2 text-sm rounded transition cursor-pointer ${
                  selectedLocations.includes(location.value)
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {location.label}
              </Button>
            ))}
          </div>

          {/* 선택된 위치 태그 */}
          {selectedLocations.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedLocations.map((location) => (
                <Button
                  key={location}
                  variant="custom"
                  size="addressBedge"
                  onClick={() => removeLocation(location)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-white rounded-full text-sm"
                >
                  {location}
                  <span className="text-red-400">×</span>
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* 시작일 */}
        <div className="border-t pt-4 border-gray-20">
          <Input
            label="시작일"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            placeholder="입력"
          />
        </div>

        {/* 금액 */}
        {/* 원넣기 */}
        <div className="border-t py-4 border-gray-20">
          <p className="text-body2 font-medium text-black mb-1">금액</p>
          <div className="flex items-center gap-2">
            <Input
              label=""
              type="number"
              value={minPay}
              suffix="원"
              onChange={(e) => setMinPay(e.target.value)}
              className="flex-1 px-4 py-3 border rounded-lg"
              placeholder="입력"
            />
            <span className="w-[180px] text-gray-400">이상부터</span>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-2 px-5 py-4 mt-4">
        <Button variant="outline" size="lg" onClick={handleReset}>
          초기화
        </Button>
        <Button variant="primary" size="lg" onClick={handleApply}>
          적용하기
        </Button>
      </div>
    </div>
  );
}
