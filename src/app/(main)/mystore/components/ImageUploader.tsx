"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import CameraIcon from "@/assets/camera.svg";

type ImageUploaderProps = {
  label?: string;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  className?: string;
};

export default function ImageUploader({
  label,
  file,
  onChange,
  error,
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0] ?? null;
    onChange(newFile);
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const inputId = "store-image-upload";

  return (
    <div className={clsx("w-full flex flex-col", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-body2 font-medium text-black mb-1"
        >
          {label}
        </label>
      )}

      <div
        className={clsx(
          "relative rounded-lg overflow-hidden aspect-[16/9] cursor-pointer bg-gray-5 border border-gray-30",
          error && "border-red-50"
        )}
        onClick={handleClick}
      >
        <input
          id={inputId}
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          onChange={handleFileChange}
        />

        {!preview && (
          <div className="absolute inset-0 bg-gray-10 flex flex-col items-center justify-center border border-gray-30">
            <CameraIcon className="w-8 h-8 mb-2 text-gray-30" />
            <span className="text-gray-30 text-body2">이미지 추가하기</span>
          </div>
        )}

        {preview && (
          <>
            <Image
              src={preview}
              alt="preview"
              fill
              unoptimized
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex flex-col items-center justify-center text-white">
              <CameraIcon className="w-8 h-8 mb-2" />
              <span className="text-body2">이미지 변경하기</span>
            </div>

            <button
              type="button"
              onClick={removeImage}
              className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded"
            >
              제거
            </button>
          </>
        )}
      </div>

      {error && <p className="mt-1 text-caption text-red-50">{error}</p>}
    </div>
  );
}
