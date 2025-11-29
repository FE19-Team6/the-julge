"use client";

import { useState } from "react";
import Input from "@/src/components/common/Input/Input";
import Textarea from "@/src/components/Textarea/Textarea";
import Button from "@/src/components/common/Button/Button";

const toLocalRFC3339 = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString();
};

export default function JobCreateClient({ shopId }: { shopId: string }) {
  const [form, setForm] = useState({
    hourlyPay: "",
    startsAt: "",
    workhour: "",
    description: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (
      !form.hourlyPay ||
      !form.startsAt ||
      !form.workhour ||
      !form.description
    ) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    const payload = {
      shopId,
      hourlyPay: Number(form.hourlyPay),
      startsAt: toLocalRFC3339(form.startsAt),
      workhour: Number(form.workhour),
      description: form.description,
    };

    const res = await fetch(`/api/notices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("등록 실패:", data);
      alert(data?.message || "공고 등록에 실패했습니다.");
      return;
    }

    window.location.href = `/mystore/${shopId}`;
  };

  return (
    <div className="w-full max-w-[900px] mx-auto py-10">
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <Input
            label="시급*"
            placeholder="10000"
            suffix="원"
            type="number"
            value={form.hourlyPay}
            onChange={(e) => handleChange("hourlyPay", e.target.value)}
          />
        </div>

        <div>
          <Input
            label="시작 일시*"
            type="datetime-local"
            value={form.startsAt}
            onChange={(e) => handleChange("startsAt", e.target.value)}
          />
        </div>

        <div>
          <Input
            label="업무 시간*"
            placeholder="3"
            suffix="시간"
            type="number"
            value={form.workhour}
            onChange={(e) => handleChange("workhour", e.target.value)}
          />
        </div>
      </div>

      <div className="mb-10">
        <label className="text-body2 font-medium text-black mb-1 block">
          공고 설명
        </label>
        <Textarea
          placeholder="공고 내용을 입력해주세요."
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-[230px] h-12"
          onClick={handleSubmit}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
