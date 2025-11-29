"use client";

import { useState } from "react";
import Modal from "@/src/components/common/ModalPopup/Modal";
import Button from "@/src/components/common/Button/Button";

import { useCreateStoreForm } from "@/src/features/stores/hooks/useCreateStoreForm";
import { useCreateStoreSubmit } from "@/src/features/stores/hooks/useCreateStoreSubmit";
import { uploadImage } from "@/src/features/stores/utils/uploadImage";

import StoreNameField from "@/src/features/stores/components/StoreNameField";
import CategorySelector from "@/src/features/stores/components/CategorySelector";
import AddressSelector from "@/src/features/stores/components/AddressSelector";
import DetailAddressField from "@/src/features/stores/components/DetailAddressField";
import DescriptionField from "@/src/features/stores/components/DescriptionField";
import StoreImageUploader from "@/src/app/(main)/mystore/components/ImageUploader";
import HourlyPayField from "@/src/features/stores/components/HourlyPayField";

export default function StoreCreateContainer() {
  const { values, errors, handleChange, validate } = useCreateStoreForm();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { submitStore, submitting, submitError } = useCreateStoreSubmit();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStoreId, setNewStoreId] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!validate()) return;

    let imageUrl: string | null = null;

    if (file) {
      try {
        setUploading(true);
        imageUrl = await uploadImage(file);
      } finally {
        setUploading(false);
      }
    }

    const storeId = await submitStore(values, imageUrl);

    if (storeId) {
      setNewStoreId(storeId);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-full flex justify-center bg-white">
      <section className="w-full max-w-5xl px-4 py-16">
        <h1 className="text-xl font-bold mb-10">가게 정보</h1>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          <StoreNameField
            value={values.storeName}
            error={errors.storeName}
            onChange={handleChange}
          />

          <CategorySelector
            value={values.category}
            error={errors.category}
            onChange={handleChange}
          />

          <AddressSelector
            value={values.address}
            error={errors.address}
            onChange={handleChange}
          />

          <DetailAddressField
            value={values.detailAddress}
            error={errors.detailAddress}
            onChange={handleChange}
          />

          <StoreImageUploader file={file} onChange={setFile} />

          <HourlyPayField
            value={values.originalHourlyPay}
            error={errors.originalHourlyPay}
            onChange={handleChange}
          />

          <DescriptionField
            value={values.description}
            onChange={handleChange}
          />

          <div className="col-span-2 flex justify-center mt-6">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={uploading || submitting}
            >
              {uploading
                ? "이미지 업로드 중…"
                : submitting
                  ? "등록 중…"
                  : "등록하기"}
            </Button>
          </div>

          {submitError && (
            <p className="col-span-2 text-center text-red-500 mt-2">
              {submitError}
            </p>
          )}
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        option="confirm"
        message="가게 등록이 완료되었습니다!"
        onConfirm={() => {
          window.location.href = `/mystore/${newStoreId}`;
        }}
      />
    </div>
  );
}
