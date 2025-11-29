"use client";

import { useState } from "react";
import {
  validateName,
  validatePhone,
} from "@/src/features/profile/utils/profileValidators";

/*
- 프로필 입력 상태(name/phone/address/bio)를 관리하는 훅
- 각 필드의 유효성 검사 및 에러 상태 포함
*/
export function useProfileForm() {
  // 입력 상태
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  // 에러 상태
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  /* 이름 입력 */
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  /* 연락처 입력 */
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError(validatePhone(value));
  };

  /* 지역 선택 */
  const handleAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddress(e.target.value);
  };

  /* 자기소개 입력 */
  const handleBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  /* 전체 유효성 검사 */
  const isFormValid =
    nameError === "" && 
    phoneError === "" &&
    name.trim() !== "" &&
    phone.trim() !== "";

  return {
    name,
    phone,
    address,
    bio,

    setName,
    setPhone,
    setAddress,
    setBio,

    handleName,
    handlePhone,
    handleAddress,
    handleBio,

    nameError,
    phoneError,

    setNameError,
    setPhoneError,

    isFormValid,
  };
}

export type ProfileFormType = ReturnType<typeof useProfileForm>;
