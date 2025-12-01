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
    bg-red-50 text-white cursor-pointer
    hover:bg-white hover:text-red-50 hover:border hover:border-red-50 
    active:bg-white active:text-red-50 active:border active:border-red-50
    focus:bg-white focus:text-red-50 focus:border focus:border-red-50
  `,
  outline: `
    bg-white border border-red-50 text-red-50 cursor-pointer
    hover:bg-red-50 hover:text-white
    active:bg-red-50 active:text-white
    focus:bg-red-50 focus:text-white
  `,
  disabled: `
    bg-gray-40 text-white cursor-not-allowed
  `,
  approve: `
    bg-white border border-blue-20 text-blue-20 cursor-pointer
    hover:bg-blue-20 hover:text-white
  `,
  custom: ``,
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
  address: `
    h-4 h-8 px-2 
    text-[11x] font-[500]
  `,
  addressBedge: `
    w-auto h-8 px-3
    text-[12px] font-[500]
  `,
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZES;
