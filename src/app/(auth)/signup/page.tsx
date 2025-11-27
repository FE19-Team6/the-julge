"use client";
import { useState } from "react";
import { useSignupForm } from "@/src/features/auth/hooks/useSignupForm";
import { signup } from "@/src/features/auth/services/signup";
import { useRouter } from "next/navigation";
import type { ModalType } from "@/src/features/auth/components/SignupModal";

import EmailInput from "@/src/features/auth/components/EmailInput";
import PasswordFields from "@/src/features/auth/components/PasswordFields";
import ConfirmPasswordField from "@/src/features/auth/components/ConfirmPasswordField";
import MembersTypeSelector from "@/src/features/auth/components/MemberTypeSelector";
import SignupButton from "@/src/features/auth/components/SignupButton";
import SignupModal from "@/src/features/auth/components/SignupModal";

import Logo from "@/assets/logo.svg";
import Link from "next/link";

export default function Page() {
  const signupForm = useSignupForm();
  const router = useRouter();

  // 어떤 모달을 보여줄지 (SUCCESS, FAIL, DUP, VALIDATION)
  const [modalType, setModalType] = useState<ModalType | null>(null);

  // 모달 열림/닫힘 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* 회원가입 처리 */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // 서버에 넘길 데이터
    const payload = {
      email: signupForm.email,
      password: signupForm.password,
      type: signupForm.memberType,
    };

    // 입력값 유효성 실패 시 VALIDATION 모달 노출
    if (!signupForm.isFormValid) {
      setModalType("VALIDATION");
      setIsModalOpen(true);
      return;
    }
    
    try {
       // 서버에 회원가입 요청함
      await signup(payload);

      // 가입 성공하면 SUCCESS 모달 노출
      setModalType("SUCCESS");
      setIsModalOpen(true);

    } catch (error) {
      console.error("signup error:", error);

      // 에러 타입에 따라 모달 종류 선택
      if (error instanceof Error) {
        if (error.message === "DUP") {
          setModalType("DUP"); // 이메일 중복
        } else {
          setModalType("FAIL"); // 기타 서버 에러 
        }
      }

      setIsModalOpen(true);
    }
  };

  return (
    <>
      {/* 상황별 모달 표시 */}
      <SignupModal
        isOpen={isModalOpen}
        type={modalType ?? "VALIDATION"}
        onConfirm={() => {
          setIsModalOpen(false);

          // SUCCESS 일 때만 로그인 페이지 이동
          if (modalType === "SUCCESS") router.push("/login");
        }}
      />

      {/* 페이지 전체 레이아웃 */}
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-[350px] space-y-7">
          {/* 로고 */}
          <div className="flex items-center justify-center">
            <Link href="/" className="cursor-pointer select-none">
              <Logo className="w-[248px] h-auto" />
            </Link>
          </div>

          {/* 회원가입 폼 */}
          <form onSubmit={handleSignup} className="space-y-7">
            <EmailInput
              email={signupForm.email}
              emailError={signupForm.emailError}
              handleEmailChange={signupForm.handleEmailChange}
              handleEmailClear={signupForm.handleEmailClear}
            />

            <PasswordFields
              password={signupForm.password}
              passwordError={signupForm.passwordError}
              handlePasswordChange={signupForm.handlePasswordChange}
            />

            <ConfirmPasswordField
              confirmPassword={signupForm.confirmPassword}
              confirmPasswordError={signupForm.confirmPasswordError}
              handleConfirmChange={signupForm.handleConfirmChange}
            />

            <MembersTypeSelector
              memberType={signupForm.memberType}
              setMemberType={signupForm.setMemberType}
            />

             {/* 로그인 페이지 이동 */}
            <p className="text-body2 text-black text-center">
              이미 가입하셨나요?
              <Link
                href="/login"
                className="text-body2 text-blue-20 pl-3 hover:underline"
              >
                로그인하기
              </Link>
            </p>

            <SignupButton type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}
