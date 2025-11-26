import Image from "next/image";
import clsx from "clsx";
import CameraIcon from "@/assets/camera.svg";

type StoreImageProps = {
  src?: string;
  alt?: string;
  variant?: "changeable" | "readonly" | "status" | "placeholder";
  title?: string;
  className?: string;
};

export default function StoreImage({
  src,
  alt = "가게 이미지",
  variant = "readonly",
  title = "",
  className,
}: StoreImageProps) {
  if (variant === "placeholder") {
    return (
      <div
        className={clsx(
          "aspect-[16/9] rounded-[5px] bg-gray-10 flex flex-col items-center justify-center border border-gray-30",
          className
        )}
      >
        <CameraIcon className="w-8 h-8 mb-2 text-gray-30" />
        <span className="text-gray-30 text-body2">이미지 추가하기</span>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "relative rounded-lg overflow-hidden aspect-[16/9]",
        className
      )}
    >
      <Image
        src={src || "/store_default.jpg"}
        alt={alt}
        fill
        className="object-cover"
      />

      {variant === "changeable" && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
          <CameraIcon className="w-8 h-8 mb-2 text-white" />
          <span className="text-body2">이미지 변경하기</span>
        </div>
      )}

      {variant === "status" && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <span className="text-gray-30 text-h2">{title}</span>
        </div>
      )}
    </div>
  );
}
