"use client";

import type { ProfileFormType } from "@/src/features/profile/hooks/useProfileForm";
import Input from "@/src/components/common/Input/Input";
import Dropdown from "@/src/components/common/Dropdown/Dropdown";

//TextArea 컴포넌트 분리: 여러 줄 입력 전용이고 높이/스크롤/줄바꿈 등 별도 UI·UX 필요
import TextArea from "@/src/features/profile/components/TextArea";

// 선호 지역 목록
import { addressOptions } from "@/src/features/stores/constants/adressOptions";


/*
 * ProfileForm
 * - 프로필 입력 필드(이름/전화번호/지역/소개)를 렌더링하는 UI
 * - useProfileForm 훅에서 상태/유효성/핸들러를 받아와 화면에 적용
 * - 반응형 레이아웃 구성
*/
export default function ProfileForm({form}: {form: ProfileFormType}) {
  const {
    name, phone, address, bio,
    nameError, phoneError,
    handleName, handlePhone, handleBio,
    setAddress
  } = form;

  return (
    <div className="w-full space-y-7">

      {/* 기본 정보 입력 (이름 / 연락처 / 지역) */}
      <div className="w-full flex flex-col gap-4 md:flex-row">
        <Input
          label="이름 *"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={handleName}
          error={nameError}
        />

        <Input
          label="연락처 *"
          placeholder="연락처를 입력하세요"
          value={phone}
          onChange={handlePhone}
          error={phoneError}
        />

        <Dropdown
          label="선호지역"
          value={address}
          onChangeValue={setAddress}
          options={addressOptions}
        />
      </div>

      {/* 자기소개 */}
      <TextArea
        label="소개"
        placeholder="자기소개를 입력하세요"
        value={bio}
        onChange={handleBio}
      />
    </div>
  );
}
