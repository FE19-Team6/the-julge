import { useState } from "react";
import Input from "@/src/components/common/Input/Input";
import EyesIcon from "@/assets/eyes.svg";
import EyesOffIcon from "@/assets/eyes-off.svg";

interface ConfirmPasswordFieldProps {
  confirmPassword: string;
  confirmPasswordError: string;
  handleConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ConfirmPasswordField({
  confirmPassword,
  confirmPasswordError,
  handleConfirmChange,
}: ConfirmPasswordFieldProps) {
  
  // 비밀번호 보임/숨김 상태
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 상태에 따라 표시할 아이콘 동적으로 선택 (패스워드 보기/가리기)
  const Icon = showConfirmPassword ? EyesIcon : EyesOffIcon;


  // 눈 아이콘 클릭 시 토글
  const toggleShowConfirmPassword = () => {
    if (!confirmPassword) return;
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* 비밀번호와 동일하게 다시 입력받아 일치 여부를 확인하는 입력 필드 */}
      <Input
        label="비밀번호 확인"
        type={showConfirmPassword ? "text" : "password"}   // ← 핵심!
        placeholder="비밀번호를 다시 입력해주세요"
        value={confirmPassword}
        onChange={handleConfirmChange}
        error={confirmPasswordError}
      />

      {/* 눈 아이콘 (보이기/숨기기) */}
    <Icon
      className="absolute top-[44px] right-4 w-5 h-5 cursor-pointer hover:opacity-60"
      onClick={toggleShowConfirmPassword}
    />

    </div>
  );
}
