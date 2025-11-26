/**
 * Button 컴포넌트
 *
 * @example
 * // 기본 사용
 * <Button>클릭</Button>
 *
 * // Variant 변경
 * <Button variant="outline">아웃라인</Button>
 * <Button variant="disabled">비활성화</Button>
 *
 * // Size 변경
 * <Button size="lg">큰 버튼</Button>
 * <Button size="sm">작은 버튼</Button>
 * <Button size="full">전체 너비</Button>
 *
 * // Submit 버튼
 * <Button type="submit" variant="primary">제출</Button>
 *
 * @param children - (필수) 버튼 내용
 * @param variant - (선택) 스타일 (primary | outline | disabled, 기본: primary)
 * @param size - (선택) 크기 (lg | md | sm | full, 기본: md)
 * @param type - (선택) 버튼 타입 (기본: button)
 * @param ...rest - button의 모든 기본 속성 사용 가능
 */

import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_BASE } from "./buttonVariants";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  variant?: "primary" | "outline" | "disabled";
  size?: "lg" | "md" | "sm" | "full";
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      {...rest}
      className={clsx(
        BUTTON_BASE,
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
