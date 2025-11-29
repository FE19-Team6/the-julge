import Modal from "@/src/components/common/ModalPopup/Modal";

// 프로필 등록/수정 시 모달에서 표시할 메시지 목록
const PROFILE_MESSAGE = {
  SUCCESS: "프로필이 등록되었습니다.",
  FAIL: "프로필 등록에 실패했습니다.",
  VALIDATION: "입력 정보를 다시 확인해주세요.",
} as const;


/*
 -PROFILE_MESSAGE의 key들을 타입으로 추출
 - "SUCCESS" | "FAIL" | "VALIDATION"
 */
export type ProfileModalType = keyof typeof PROFILE_MESSAGE;

// ProfileModal 컴포넌트 Props 타입
interface ProfileModalProps {
  isOpen: boolean;
  type: ProfileModalType;
  onConfirm: () => void;
}

/*
 - 프로필 등록 성공/실패/유효성 에러 등의 상황에서 사용자에게 메시지를 보여주는 모달
 - message는 PROFILE_MESSAGE[type]으로 자동 매핑됨
 */
export default function ProfileModal({ isOpen, type, onConfirm } : ProfileModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      option="confirm"
      message={PROFILE_MESSAGE[type]}
      onConfirm={onConfirm}
    />
  );
}
