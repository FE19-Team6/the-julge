/** 버튼 스타일 베이스 */
export const BUTTON_BASE = `
  inline-flex items-center justify-center
  rounded-[6px]
  text-center
  transition-colors duration-150
`;

/** 버튼 스타일 종류 */
// "primary" | "outline" | "disabled"
export const BUTTON_VARIANTS = {
  primary: `
    bg-primary-700 text-white cursor-pointer
    hover:bg-white hover:text-primary-700 hover:border hover:border-primary-700 
    active:bg-white active:text-primary-700 active:border active:border-primary-700
    focus:bg-white focus:text-primary-700 focus:border focus:border-primary-700
  `,
  outline: `
    bg-white border border-primary-700 text-primary-700 cursor-pointer
    hover:bg-primary-700 hover:text-white
    active:bg-primary-700 active:text-white
    focus:bg-primary-700 focus:text-white
  `,
  disabled: `
    bg-gray-600 text-white cursor-not-allowed
  `,
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;

/** 버튼 크기 종류 */
// "sm" | "md" | "lg" | "full"
export const BUTTON_SIZES = {
  sm: `
    w-[82px] h-8 px-3
    text-[12px] font-[500]
  `,
  md: `
    w-[108px] h-9 px-4
    text-[14px] font-[500]
  `,
  lg: `
    w-[350px] h-12 px-5
    text-[16px] font-[500]
  `,
  full: `
    w-full h-12 px-5
    text-[16px] font-[500]
  `,
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZES;
