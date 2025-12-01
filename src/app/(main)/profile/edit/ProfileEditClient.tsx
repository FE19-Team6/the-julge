"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/src/components/common/Button/Button";
import ProfileForm from "@/src/features/profile/components/ProfileForm";
import ProfileModal, { ProfileModalType } from "@/src/features/profile/components/ProfileModal";

import { useProfileForm } from "@/src/features/profile/hooks/useProfileForm";
import { updateProfile } from "@/src/features/profile/services/profileService";
import type { Profile } from "@/src/features/auth/type.ts";

/* 
프로필 수정 클라이언트 컴포넌트
- 기존 프로필 데이터를 폼에 채우고 프로필 수정 처리
- 결과 모달 표시 (성공/실패/검증오류)
*/
export default function ProfileEditClient({ profile }: { profile: Profile | null }) {
  const router = useRouter();
  const profileForm = useProfileForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ProfileModalType>("VALIDATION");
  const [isLoading, setIsLoading] = useState(false);

  // 기존 프로필 데이터를 폼에 세팅
  useEffect(() => {
    if (profile) {
      profileForm.setName(profile.name || "");
      profileForm.setPhone(profile.phone || "");
      profileForm.setAddress(profile.address || "");
      profileForm.setBio(profile.bio || "");
    }
  }, [profile]);

  // 수정 처리
  const handleSubmit = async () => {
    if (!profileForm.isFormValid) {
      setModalType("VALIDATION");
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({
        name: profileForm.name,
        phone: profileForm.phone,
        address: profileForm.address,
        bio: profileForm.bio,
      });

      setModalType("EDIT");
      setIsModalOpen(true);
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      setModalType("FAIL");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 모달 확인 (성공 시 이동, 그 외 닫기)
  const handleModalConfirm = () => {
    setIsModalOpen(false);

    if (modalType === "EDIT") {
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

          <div className="space-y-8">
            {/* 프로필 입력 폼 */}
            <ProfileForm form={profileForm} />

            {/* 저장 버튼 */}
            <div className="w-full flex justify-center mt-6">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleSubmit}
                disabled={isLoading}
                className={isLoading ? "!bg-gray-30 !text-gray-50 !cursor-not-allowed" : ""}
              >
                {isLoading ? "저장 중..." : "저장하기"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}