"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/src/components/common/Button/Button";
import ProfileForm from "@/src/features/profile/components/ProfileForm";
import ProfileModal, { ProfileModalType } from "@/src/features/profile/components/ProfileModal";

import { useProfileForm } from "@/src/features/profile/hooks/useProfileForm";
import { updateProfile } from "@/src/features/profile/services/profileService";

/* 
프로필 생성 클라이언트 컴포넌트
- 프로필 폼 입력 및 검증
- 프로필 등록 처리 및 결과 모달 표시 (성공/실패/검증오류)
*/
export default function ProfileCreateClient() {
  const router = useRouter();
  const profileForm = useProfileForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ProfileModalType>("VALIDATION");
  const [isLoading, setIsLoading] = useState(false);

  // 등록 처리
  const handleSubmit = async () => {
    if (!profileForm.isFormValid) {
      setModalType("VALIDATION");
      setIsModalOpen(true);
      return;
    }

    // 프로필 등록 시 API 호출 및 결과 처리
    setIsLoading(true);
    try {
      await updateProfile({
        name: profileForm.name,
        phone: profileForm.phone,
        address: profileForm.address,
        bio: profileForm.bio,
      });

      setModalType("SUCCESS");
      setIsModalOpen(true);
    } catch (error) {
      console.error("프로필 등록 실패:", error);
      setModalType("FAIL");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 모달 확인 (성공 시 이동, 그 외 닫기)
  const handleModalConfirm = () => {
    setIsModalOpen(false);

    if (modalType === "SUCCESS") {
      router.push("/profile");
    }
  };

  return (
    <>
      {/* 결과 모달 */}
      <ProfileModal
        isOpen={isModalOpen}
        type={modalType}
        onConfirm={handleModalConfirm}
      />

      <div className="w-full mt-15">
        <div className="w-full max-w-[964px] mx-auto px-4 md:px-6 lg:px-0 space-y-8">
          <h1 className="text-h2">내 프로필</h1>

          {/* 프로필 입력 폼 */}
          <div className="space-y-8">
            <ProfileForm form={profileForm} />

            {/* 등록 버튼 */}
            <div className="w-full flex justify-center mt-6">
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                onClick={handleSubmit}
                disabled={isLoading}
                className={isLoading ? "!bg-gray-30 !text-gray-50 !cursor-not-allowed" : ""}

              >
                {isLoading ? "등록 중..." : "등록하기"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}