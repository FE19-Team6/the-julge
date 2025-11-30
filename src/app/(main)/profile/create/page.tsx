
"use client";

import { useState } from "react";
import Button from "@/src/components/common/Button/Button";
import ProfileForm from "@/src/features/profile/components/ProfileForm";
import ProfileModal, {
  ProfileModalType,
} from "@/src/features/profile/components/ProfileModal";

import { useProfileForm } from "@/src/features/profile/hooks/useProfileForm";
import { updateProfile } from "@/src/features/profile/services/updateProfile";

export default function Page() {
  // 프로필 작성 상태 + 핸들러 + 에러
  const profileForm = useProfileForm();

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ProfileModalType>("VALIDATION");

  // 등록하기 클릭
  const handleSubmit = async () => {
    
    // 전체 유효성 검사
    if (!profileForm.isFormValid) {
      setModalType("VALIDATION");
      setIsModalOpen(true);
      return;
    }

    // API 호출
    try {
      await updateProfile(
        {
        name: profileForm.name,
        phone: profileForm.phone,
        address: profileForm.address,
        bio: profileForm.bio,
      });

      setModalType("SUCCESS");
      setIsModalOpen(true);

    } catch (err) {
      console.error(err);
      setModalType("FAIL");
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* 커스텀 모달 */}
      <ProfileModal
        isOpen={isModalOpen}
        type={modalType}
        onConfirm={() => setIsModalOpen(false)}
      />

      {/* 페이지 레이아웃 */}
      <div className="w-full mt-15">
      <div className="w-full max-w-[964px] mx-auto px-4 md:px-6 lg:px-0 space-y-8">
        <h1 className="text-h2">내 프로필</h1>

          {/* 폼 영역 */}
          <ProfileForm form={profileForm} />

          {/* 버튼 중앙 정렬 */}
          <div className="w-full flex justify-center mt-6">
            <Button variant="primary" size="lg" onClick={handleSubmit}>
              등록하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
