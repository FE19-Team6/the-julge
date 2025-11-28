"use client";

import Link from "next/link";
import Logo from "@/assets/logo.svg";
import Input from "@/src/components/common/Input/Input";
import Button from "@/src/components/common/Button/Button";
import { useLogin } from "@/src/lib/hooks/useLogin";

export default function LoginPage() {
  const { email, setEmail, password, setPassword, handleLogin, isLoading } =
    useLogin();

  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* 로고 */}
      <Link href="/" className="cursor-pointer select-none">
        <Logo className="w-[248px] h-auto" />
      </Link>
      {/* 폼 컨테이너 */}
      <form
        onSubmit={handleLogin}
        className="w-[350px] flex flex-col mt-[40px] gap-7"
      >
        {/* 이메일 */}
        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        {/* 비밀번호 */}
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {/* 로그인 버튼 */}
        <Button type="submit" size="full">
          로그인 하기
        </Button>
        {/* 회원가입 info*/}
        <p className="text-center text-sm text-gray-500">
          회원이 아니신가요?{" "}
          <Link href="/signup" className="text-[#5534DA] underline">
            회원가입하기
          </Link>
        </p>
      </form>
    </div>
  );
}
