/**
 * Input 컴포넌트
 *
 * @example
 * // 기본 사용
 * <Input label="이메일" type="email" placeholder="이메일 입력" />
 *
 * // 에러 표시
 * <Input label="비밀번호" type="password" error="8자 이상 입력하세요" />
 *
 * // Suffix 사용 (단위 표시)
 * <Input label="시급" type="number" suffix="원" />
 *
 * // Textarea로 사용
 * <Input as="textarea" label="설명" rows={4} />
 *
 * // Props
 * @param label - 필수, 입력 필드 라벨
 * @param error - 선택, 에러 메시지 (빨간 테두리)
 * @param suffix - 선택, 오른쪽에 표시될 텍스트
 * @param as - 선택, 다른 요소로 변경 (기본: input)
 * @param className - 선택, 추가 스타일
 * @param ...rest - input의 모든 기본 속성 사용 가능
 */

import { ComponentPropsWithoutRef, ElementType, useId } from "react";
import clsx from "clsx";

export type InputProps<T extends ElementType> = {
  as?: T;
  label: string;
  error?: string;
  suffix?: string;
} & ComponentPropsWithoutRef<T>;

const Input = <T extends ElementType = "input">({
  as,
  label,
  error,
  suffix,
  id,
  className,
  ...rest
}: InputProps<T>) => {
  const Component = as || "input";
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>

      <div
        className={clsx(
          "flex items-center bg-white border rounded-lg px-4 h-14",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      >
        <Component id={inputId} {...rest} className="w-full outline-none" />

        {suffix && <span className="text-black ml-2">{suffix}</span>}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Input;
