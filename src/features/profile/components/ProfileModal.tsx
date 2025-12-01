"use client";

import Modal from "@/src/components/common/ModalPopup/Modal";

/*
- 프로필 모달 타입
- VALIDATION: 입력 검증 실패
- SUCCESS: 프로필 등록 성공
- FAIL: 프로필 등록 실패
- EDIT: 프로필 수정 성공
*/
export type ProfileModalType = "VALIDATION" | "SUCCESS" | "FAIL" | "EDIT";

// 모달 타입별 메시지 설정
const MODAL_MESSAGES = {
  VALIDATION: {
    message: "모든 필드를 올바르게 입력해주세요.",
    option: "confirm" as const,
  },
  SUCCESS: {
    message: "프로필이 성공적으로 등록되었습니다.",
    option: "confirm" as const,
  },
  FAIL: {
    message: "프로필 등록에 실패했습니다. 다시 시도해주세요.",
    option: "confirm" as const,
  },
  EDIT: {
    message: "프로필이 성공적으로 수정되었습니다.",
    option: "confirm" as const,
  },
};

type ProfileModalProps = {
  isOpen: boolean;
  type: ProfileModalType;
  onConfirm: () => void;
};

/*
- 프로필 관련 모달 컴포넌트
- 타입에 따라 맞는 메시지 표시
*/
export default function ProfileModal({ isOpen, type, onConfirm }: ProfileModalProps) {
  const modalInfo = MODAL_MESSAGES[type];

  return (
    <Modal
      isOpen={isOpen}
      option={modalInfo.option}   // confirm or action
      message={modalInfo.message}
      onConfirm={onConfirm}
    />
  );
}
