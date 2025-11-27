import { useState } from "react";
import Input from "@/src/components/common/Input/Input";
import DeleteIcon from "@/assets/delete.svg";

interface EmailInputProps {
  email: string;
  emailError: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailClear: () => void;
}

export default function EmailInput({
  email,
  emailError,
  handleEmailChange,
  handleEmailClear,
}: EmailInputProps) {
  
  // 인풋 값이 있더라도 포커스가 없으면 X 버튼을 숨기기 위해서 useState 사용함
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {/* 이메일 입력받는 필드 */}
      <Input
        label="이메일"
        placeholder="이메일을 입력해주세요"
        value={email}
        type="email"
        onChange={handleEmailChange}
        error={emailError}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
      />

      {/* 이메일 입력 시 삭제 버튼 노출 */}
      {email && isFocused && (
        <DeleteIcon
          className="absolute top-[44px] right-4 w-5 h-5 cursor-pointer hover:opacity-60"
          onClick={handleEmailClear}
        />
      )}
    </div>
  );
}
