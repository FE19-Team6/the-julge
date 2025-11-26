"use client";

import Input from "@/components/common/Input/Input";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import Button from "@/components/common/Button/Button";
import StoreImage from "@/components/common/StoreImage/StoreImage";
import { categoryOptions } from "../../../../features/stores/utils/categoryOptions";
import { addressOptions } from "../../../../features/stores/utils/adressOptions";
import Textarea from "@/components/common/Textarea";

export default function StoreCreatePage() {
  return (
    <div className="w-full flex justify-center bg-white">
      <section className="w-full max-w-5xl px-4 py-16">
        <h1 className="text-xl font-bold mb-10">가게 정보</h1>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          <Input label="가게 이름" placeholder="입력" />

          <Dropdown
            label="분류"
            placeholder="선택"
            options={categoryOptions}
            onChangeValue={() => {}}
          />

          <Dropdown
            label="주소"
            placeholder="선택"
            options={addressOptions}
            onChangeValue={() => {}}
          />

          <Input label="상세 주소" placeholder="입력" />

          <div className="col-span-1">
            <label className="mb-2 block font-medium">가게 이미지</label>
            <div className="w-[483px] h-[276px]">
              <StoreImage
                variant="changeable"
                src="/store_default.png"
                title="이미지 변경"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label>가게 정보</label>
            <Textarea placeholder="입력" />
          </div>

          <div className="col-span-2 flex justify-center">
            <Button variant="primary" size="lg">
              등록하기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
