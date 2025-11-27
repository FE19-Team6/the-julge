import Modal from "@/src/components/common/ModalPopup/Modal";

// 회원가입 시 발생할 수 있는 상황을 정의한 메시지를 묶어놓음
const SIGNUP_MODAL_TYPE = {
  DUP: "이미 사용중인 이메일입니다",
  FAIL: "회원가입에 실패했습니다",
  VALIDATION: "입력 정보를 다시 확인해주세요",
  SUCCESS: "회원가입이 완료되었습니다",
} as const;

// SIGNUP_TYPE 객체의 key 값만 타입으로 자동 추출하여 다른 곳에서도 쓰일 수 있음
export type ModalType = keyof typeof SIGNUP_MODAL_TYPE;

// SignupModal 컴포넌트에서 받을 props 타입 정의
interface SignupModalProps {
  isOpen: boolean;
  type: ModalType;   
  onConfirm: () => void;
}

// 실제 모달 UI는 공통 Modal 컴포넌트 사용하지만 SIGNUP_MODAL_TYPE[type] 을 이용해 자동으로 메시지 매핑됨
export default function SignupModal({ isOpen, type, onConfirm }: SignupModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      option="confirm"
      message={SIGNUP_MODAL_TYPE[type]}   
      onConfirm={onConfirm}
    />
  );
}
