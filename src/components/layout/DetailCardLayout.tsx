import Image from "next/image";
import Button from "@/src/components/common/Button/Button";
import { ReactNode } from "react";

type StoreCardProps = {
  type: "store";
  image: string;
  category: string;
  name: string;
  location: string;
  description: string;
  imageSlot?: ReactNode;
  buttonSlot?: ReactNode;
};

type WageCardProps = {
  type: "wage";
  image: string;
  wage: number;
  time: string;
  location: string;
  description: string;
  imageSlot?: ReactNode;
  badgeSlot?: ReactNode;
  buttonSlot?: ReactNode;
};

export type DetailCardLayoutProps = StoreCardProps | WageCardProps;

export default function DetailCardLayout(props: DetailCardLayoutProps) {
  const { image, description, location, imageSlot } = props;

  return (
    <div
      className={`
        w-full flex rounded-xl overflow-hidden border border-gray-200
        ${props.type === "store" ? "bg-red-10" : "bg-white"}
      `}
    >
      <div className="relative w-[312px] aspect-4/3 shrink-0 bg-gray-100">
        {imageSlot ? (
          imageSlot
        ) : (
          <Image
            src={image}
            alt={
              props.type === "store"
                ? `${props.name} 이미지`
                : "시급 공고 이미지"
            }
            fill
            className="object-cover"
            sizes="312px"
          />
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 gap-6 justify-between">
        {props.type === "store" && (
          <>
            <div className="flex flex-col gap-1.5">
              <p className="text-red-50 text-sm font-medium">
                {props.category}
              </p>

              <p className="text-[20px] font-semibold text-black leading-tight">
                {props.name}
              </p>

              <p className="text-gray-50 text-sm">{location}</p>
            </div>

            <p className="text-black text-sm leading-relaxed">{description}</p>

            {props.buttonSlot ? (
              props.buttonSlot
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="md">
                  편집하기
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="whitespace-nowrap"
                >
                  공고 등록하기
                </Button>
              </div>
            )}
          </>
        )}

        {props.type === "wage" && (
          <>
            <div className="flex flex-col gap-1.5">
              <p className="text-red-50 text-sm font-medium">시급</p>

              <div className="flex items-center gap-2">
                <p className="text-[24px] font-semibold text-black leading-tight">
                  {props.wage.toLocaleString()}원
                </p>
                {props.badgeSlot}
              </div>

              <p className="text-gray-50 text-sm">{props.time}</p>
              <p className="text-gray-50 text-sm">{location}</p>
            </div>

            <p className="text-black text-sm leading-relaxed">{description}</p>

            {props.buttonSlot ? (
              props.buttonSlot
            ) : (
              <Button variant="primary" size="md">
                신청하기
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
