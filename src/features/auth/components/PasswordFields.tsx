import { useState } from "react";
import Input from "@/src/components/common/Input/Input";
import EyesIcon from "@/assets/eyes.svg"
import EyesOffIcon from "@/assets/eyes-off.svg"

interface PasswordFieldProps {
  password: string;
  passwordError: string;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordField({
  password,
  passwordError,
  handlePasswordChange,
}: PasswordFieldProps) {


  // 비밀번호 보임/숨김 상태
  const [showPassword, setShowPassword] = useState(false);

  // 눈 아이콘 클릭 시 상태 토글
  const toggleShowPassword = () => {
    if (!password) return;
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
        {/* 비밀번호를 입력받는 필드 및 비밀번호 확인 */}
        <Input
            label="비밀번호"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
        />

        {/* 비밀번호 보이기/숨기기 아이콘 */}
        {showPassword ? (
            <EyesIcon
            className="absolute top-[44px] right-4 w-5 h-5 cursor-pointer hover:opacity-60"
            onClick={toggleShowPassword}
            />
        ) : (
            <EyesOffIcon
            className="absolute top-[44px] right-4 w-5 h-5 cursor-pointer hover:opacity-60"
            onClick={toggleShowPassword}
            />
        )}
    </div>
  );
}
