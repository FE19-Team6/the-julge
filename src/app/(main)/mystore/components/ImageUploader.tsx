"use client";

import CamerIcon from "@/assets/camera.svg";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

type ImageUploaderProps = {
  label?: string;
  error?: string;
  onChangeValue?: (file: File | null) => void;
  className?: string;
};

export default function ImageUploader({
  label,
  error,
  onChangeValue,
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles?.[0];
      if (!file) return;

      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);

      onChangeValue?.(file);
    },
    [onChangeValue]
  );

  const removeImage = () => {
    setPreview(null);
    onChangeValue?.(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop,
  });

  return (
    <div className={clsx("w-full flex flex-col", className)}>
      {label && (
        <label className="text-body2 font-medium text-black mb-1">
          {label}
        </label>
      )}

      <div
        {...getRootProps()}
        className={clsx(
          "w-full h-[280px] rounded-[10px] border bg-gray-5 border-gray-30 cursor-pointer flex items-center justify-center relative overflow-hidden",
          error && "border-red-50"
        )}
      >
        <input {...getInputProps()} />

        {preview ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={preview}
                alt="preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <button
              type="button"
              className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
            >
              제거
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <CamerIcon />
            <p className="text-gray-40">이미지 추가하기</p>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-caption text-red-50">{error}</p>}
    </div>
  );
}
