"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import Button from "@/src/components/common/Button/Button";

export type Props = {
  label: string;
  value?: Date;
  onChange: (v: Date) => void;
};

const hours = [...Array(24).keys()];
const minutes = [0, 30];

export default function DateTimePicker({ label, value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>(value);
  const [hour, setHour] = useState(value?.getHours() ?? 0);
  const [minute, setMinute] = useState(value?.getMinutes() ?? 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const apply = () => {
    if (!date) return;
    onChange(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hour,
        minute
      )
    );
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative flex flex-col w-full gap-1">
      <span className="text-body2 font-medium text-black">{label}</span>

      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="h-14 px-4 text-left border border-gray-30 rounded-[10px] bg-white"
      >
        {value ? format(value, "yyyy-MM-dd HH:mm") : "날짜와 시간을 선택하세요"}
      </button>

      {open && (
        <div
          className="
          absolute top-full left-0 
          w-[380px]  
          mt-2 z-50 p-4 
          bg-white border border-gray-30 
          rounded-[10px] shadow space-y-4
        "
        >
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
            weekStartsOn={0}
            classNames={{
              day: "rdp-day",
              selected: "!text-red-50 !font-semibold !bg-transparent",
              today: "!text-red-50",
              nav_button: "!text-red-50 hover:!bg-gray-10",
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-50 mb-1">시</p>
              <div className="grid grid-cols-4 gap-1 max-h-40 overflow-y-auto">
                {hours.map((h) => (
                  <button
                    key={h}
                    onClick={() => setHour(h)}
                    className={`py-1 rounded text-sm
                      ${
                        hour === h
                          ? "bg-red-50 text-white"
                          : "bg-white text-black hover:bg-gray-10"
                      }
                    `}
                  >
                    {h}시
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-50 mb-1">분</p>
              <div className="grid grid-cols-2 gap-1">
                {minutes.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinute(m)}
                    className={`py-1 rounded text-sm
                      ${
                        minute === m
                          ? "bg-red-50 text-white"
                          : "bg-white text-black hover:bg-gray-10"
                      }
                    `}
                  >
                    {String(m).padStart(2, "0")}분
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button variant="primary" size="full" onClick={apply}>
            적용하기
          </Button>
        </div>
      )}
    </div>
  );
}
