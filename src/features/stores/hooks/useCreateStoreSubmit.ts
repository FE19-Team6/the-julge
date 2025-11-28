import { useState } from "react";
import { StoreCreateValues } from "./useCreateStoreForm";
import { storeService } from "../services/storeService";

export function useCreateStoreSubmit() {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitStore = async (
    values: StoreCreateValues,
    imageUrl: string | null
  ): Promise<number | null> => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        name: values.storeName,
        category: values.category,
        address1: values.address,
        address2: values.detailAddress,
        description: values.description,
        imageUrl: imageUrl ?? "/store_default.png",

        // ✅ number | null → number 변환
        originalHourlyPay: values.originalHourlyPay ?? 0,
      };

      const result = await storeService.create(payload);

      // 서버 응답 확인
      const id = result?.item?.id;
      if (!id) {
        setSubmitError("등록된 가게 ID를 찾을 수 없습니다.");
        return null;
      }

      return id;
    } catch (e) {
      setSubmitError("가게 등록 중 오류가 발생했습니다.");
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitStore, submitting, submitError };
}
