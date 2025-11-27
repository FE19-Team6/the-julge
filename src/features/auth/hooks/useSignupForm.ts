import { useState } from "react";
import { isValidEmail, isValidPassword, isSamePassword } from "@/src/features/auth/utils/validators";


export function useSignupForm() {
  /* 상태: 이메일, 비밀번호, 비밀번호 확인, 회원유형 */
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  type MemberType = "employee" | "employer";
  const [memberType, setMemberType] = useState<MemberType>("employee");

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
    const value = e.target.value;
    setEmail(value);

    if (value.length < 5) {
      setEmailError("");
      return;
    }

    validateEmail(value);
  };

  /* 이메일 초기화 */
  const handleEmailClear = () => {
    setEmail("");
    setEmailError("");
  };

  /* 비밀번호 검사 */
  const validatePassword = (value: string) => {
    if (value.length === 0) {
      setPasswordError("");
      return false;
    }

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

  /* 비밀번호 변경 */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "");

    setPassword(value);
    validatePassword(value);

    if (confirmPassword) {
      validateConfirm(confirmPassword);
    }
  };

  /* 비밀번호 확인 검사 */
  const validateConfirm = (value: string) => {
    
    if (!value) {
      setConfirmPasswordError("");
      return false;
    }

    if (!isSamePassword(password, value)) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      return false;
    }

    setConfirmPasswordError("");
    return true;
  };

  /* 비밀번호 확인 변경 */
  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "");

    setConfirmPassword(value);
    validateConfirm(value);
  };

 
  /* 폼 전체 유효 여부 체크 */
  const isFormValid =
    isValidEmail(email) &&
    isValidPassword(password) &&
    isSamePassword(password, confirmPassword);

  return {
    email,
    emailError,
    handleEmailChange,
    handleEmailClear,

    password,
    passwordError,
    handlePasswordChange,

    confirmPassword,
    confirmPasswordError,
    handleConfirmChange,

    memberType,
    setMemberType,

    isFormValid, 
  };
}
