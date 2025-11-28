import { useState } from "react";
import {
  isValidEmail,
  isValidPassword,
} from "@/src/features/auth/utils/validators";

export function useLoginForm() {
  /* 상태 */
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /* 이메일 검사 */
  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("이메일을 입력해주세요.");
      return false;
    }

    if (!isValidEmail(value)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      return false;
    }

    setEmailError("");
    return true;
  };

  /* 이메일 입력 변경 */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setEmail(v);

    if (v.length < 5) {
      setEmailError("");
      return;
    }

    validateEmail(v);
  };

  /* 이메일 초기화 */
  const handleEmailClear = () => {
    setEmail("");
    setEmailError("");
  };

  /* 비밀번호 검사 */
  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("비밀번호를 입력해주세요.");
      return false;
    }

    if (!isValidPassword(value)) {
      setPasswordError("비밀번호는 8자 이상 입력해주세요.");
      return false;
    }

    setPasswordError("");
    return true;
  };

  /* 비밀번호 입력 변경 */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\s+/g, "");
    setPassword(v);

    validatePassword(v);
  };

  /* 전체 유효성 체크 */
  const isFormValid = isValidEmail(email) && isValidPassword(password);

  return {
    email,
    emailError,
    handleEmailChange,
    handleEmailClear,

    password,
    passwordError,
    handlePasswordChange,

    isFormValid,
  };
}
