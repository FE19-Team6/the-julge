"use client";

import { useState } from "react";
import { useLoginForm } from "@/src/features/auth/hooks/useLoginForm";
import { useLoginSubmit } from "@/src/features/auth/hooks/useLoginSubmit";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import EmailInput from "@/src/features/auth/components/EmailInput";
import PasswordFields from "@/src/features/auth/components/PasswordFields";
import Button from "@/src/components/common/Button/Button";
import Modal from "@/src/components/common/ModalPopup/Modal";

export default function LoginPage() {
  const loginForm = useLoginForm();
  const { submitLogin, isLoading, loginError } = useLoginSubmit();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginForm.isFormValid) {
      setModalMessage("입력값을 확인해주세요");
      setIsModalOpen(true);
      return;
    }

    const ok = await submitLogin(loginForm.email, loginForm.password);

    if (!ok) {
      setModalMessage(loginError || "로그인 실패");
      setIsModalOpen(true);
      return;
    }

    router.push("/");
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center px-4">
        {/* 로고 */}
        <Link href="/" className="cursor-pointer select-none">
          <Logo className="w-[248px] h-auto" />
        </Link>

        {/* 폼 컨테이너 */}
        <form
          onSubmit={handleSubmit}
          className="w-[350px] flex flex-col mt-[40px] gap-7"
        >
          {/* 이메일 */}
          <EmailInput
            email={loginForm.email}
            emailError={loginForm.emailError}
            handleEmailChange={loginForm.handleEmailChange}
            handleEmailClear={loginForm.handleEmailClear}
          />

          <PasswordFields
            password={loginForm.password}
            passwordError={loginForm.passwordError}
            handlePasswordChange={loginForm.handlePasswordChange}
          />

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            size="full"
            disabled={isLoading}
            variant={isLoading ? "disabled" : "primary"}
          >
            {isLoading ? "로그인 중…" : "로그인 하기"}
          </Button>

          {/* 회원가입 info */}
          <p className="text-center text-sm text-gray-500">
            회원이 아니신가요?{" "}
            <Link href="/signup" className="text-[#5534DA] underline">
              회원가입하기
            </Link>
          </p>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        option="confirm"
        message={modalMessage}
        onConfirm={handleConfirm}
      />
    </>
  );
}
