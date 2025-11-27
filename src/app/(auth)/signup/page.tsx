"use client";

import { useSignupForm } from "@/src/features/auth/hooks/useSignupForm";
import { signup } from "@/src/features/auth/services/signup";
import { useRouter } from "next/navigation";
import EmailInput from "@/src/features/auth/components/EmailInput";
import PasswordFields from "@/src/features/auth/components/PasswordFields";
import ConfirmPasswordField from "@/src/features/auth/components/ConfirmPasswordField";
import MembersTypeSelector from "@/src/features/auth/components/MemberTypeSelector";
import SignupButton from "@/src/features/auth/components/SignupButton";
import LogoIcon from "@/assets/logo.svg";
import Link from "next/link";

export default function Page() {
  const signupForm = useSignupForm();
  const router = useRouter();

  /* --------------------------------------
    회원가입 처리 함수
    - 폼 데이터를 payload로 구성
    - 유효성 검사 후 서버에 회원가입 요청
    - 성공하면 /login 페이지로 이동
  -------------------------------------- */
  const handleSignup = async () => {
    // 서버에 보낼 회원가입 데이터 (Swagger 명세서 기반으로 작성)
    const payload = {
      email: signupForm.email,
      password: signupForm.password,
      type: signupForm.memberType,
    };

    // 전체 입력값 유효성 체크
    if (!signupForm.isFormValid) {
      alert("모든 항목을 올바르게 입력해주세요");
      return;
    }

    try {
      // 회원가입 API 호출
      await signup(payload);

      // 성공 시 로그인 페이지로 이동
      router.push("/login");
    } catch (error: unknown) {
      // 409 / 서버 에러 메시지 처리
      if (error instanceof Error) {
        alert(error.message);
        return;
      }

      // 기타 에러
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-[350px] space-y-7">
        
        {/* 로고 클릭 시 홈(/)으로 이동 */}
        <div className="flex items-center justify-center">
          <Link href="/">
            <LogoIcon className="cursor-pointer" />
          </Link>
        </div>

        {/* 이메일 입력 */}
        <EmailInput
          email={signupForm.email}
          emailError={signupForm.emailError}
          handleEmailChange={signupForm.handleEmailChange}
          handleEmailClear={signupForm.handleEmailClear}
        />

        {/* 비밀번호 입력 */}
        <PasswordFields
          password={signupForm.password}
          passwordError={signupForm.passwordError}
          handlePasswordChange={signupForm.handlePasswordChange}
        />

        {/* 비밀번호 확인 입력 */}
        <ConfirmPasswordField
          confirmPassword={signupForm.confirmPassword}
          confirmPasswordError={signupForm.confirmPasswordError}
          handleConfirmChange={signupForm.handleConfirmChange}
        />

        {/* 회원 유형 선택 (employee / employer) */}
        <MembersTypeSelector
          memberType={signupForm.memberType}
          setMemberType={signupForm.setMemberType}
        />

        {/* 로그인 페이지 이동 링크 */}
        <p className="text-body2 text-black text-center">
          이미 가입하셨나요?
          <Link
            href="/login"
            className="text-body2 text-blue-20 pl-3 hover:underline"
          >
            로그인하기
          </Link>
        </p>

        {/* 회원가입 버튼 */}
        <SignupButton onClick={handleSignup} />
      </div>
    </div>
  );
}
