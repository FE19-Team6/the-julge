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
};

export type DetailCardLayoutProps = StoreCardProps | WageCardProps;

const DetailCardLayout = (props: DetailCardLayoutProps) => {
  const { image, description, location, imageSlot } = props;

  return (
    <div
      className={`
        w-full
        flex rounded-xl overflow-hidden border border-color-gray-20
          ${props.type === "store" ? "bg-red-10" : "bg-color-white"}        
      `}
    >
      <div className="relative w-[312px] min-h-60">
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
          />
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 p-6 gap-4">
        {props.type === "store" && (
          <>
            <div className="flex flex-col gap-1.5">
              <p className="text-red-50 text-[14px] font-medium">
                {props.category}
              </p>

              <p className="text-[20px] font-semibold text-black leading-tight">
                {props.name}
              </p>

              <p className="text-gray-50 text-[14px]">{location}</p>
            </div>

            <p className="text-black text-[14px] leading-relaxed">
              {description}
            </p>

            <div className="flex gap-2">
              <Button variant="outline" size="md">
                편집하기
              </Button>
              <Button variant="primary" className="whitespace-nowrap w-fit">
                공고 등록하기
              </Button>
            </div>
          </>
        )}

        {props.type === "wage" && (
          <>
            <div className="flex flex-col gap-1.5">
              <p className="text-red-50 text-[14px] font-medium">시급</p>

              <div className="flex items-center gap-2">
                <p className="text-[24px] font-semibold text-black leading-tight">
                  {props.wage.toLocaleString()}원
                </p>

                {props.badgeSlot}
              </div>

              <p className="text-gray-50 text-[14px]">{props.time}</p>
              <p className="text-gray-50 text-[14px]">{location}</p>
            </div>

            <p className="text-black text-[14px] leading-relaxed">
              {description}
            </p>

            <Button variant="primary" size="md">
              신청하기
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailCardLayout;
