// src/features/stores/hooks/useStoreCreateForm.ts
import { useState } from "react";

export interface StoreCreateValues {
  storeName: string;
  category: string;
  address: string;
  detailAddress: string;
  description: string;
  originalHourlyPay: number | null; // number 기반
}

export interface StoreCreateErrors {
  storeName?: string;
  category?: string;
  address?: string;
  detailAddress?: string;
  originalHourlyPay?: string; // ❗ error는 string이어야 함
}

export function useCreateStoreForm() {
  const [values, setValues] = useState<StoreCreateValues>({
    storeName: "",
    category: "",
    address: "",
    detailAddress: "",
    description: "",
    originalHourlyPay: null, // 기본값 null
  });

  const [errors, setErrors] = useState<StoreCreateErrors>({});

  const handleChange = (
    key: keyof StoreCreateValues,
    value: string | number
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const newErrors: StoreCreateErrors = {};

    if (!values.storeName.trim())
      newErrors.storeName = "가게 이름을 입력해주세요.";

    if (!values.category.trim()) newErrors.category = "분류를 선택해주세요.";

    if (!values.address.trim()) newErrors.address = "주소를 선택해주세요.";

    if (!values.detailAddress.trim())
      newErrors.detailAddress = "상세 주소를 입력해주세요.";

    if (!values.originalHourlyPay || values.originalHourlyPay <= 0)
      newErrors.originalHourlyPay = "기본 시급을 입력해주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validate };
}
