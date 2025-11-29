import clsx from "clsx";

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
};

/*
- Input으로는 자기소개 같은 긴 내용을 입력하기 어렵고 UI도 비슷하게 만들 수 없어서
  TextArea를 별도 컴포넌트로 분리해 공용으로 관리하도록 구현했습니다.
*/
export default function TextArea({
  label,
  value,
  onChange,
  placeholder,
  className
}: TextAreaProps) {
  return (
    <div className={clsx("w-full flex flex-col", className)}>
      <label className="text-body2 font-bold mb-2">{label}</label>
      <textarea
        className={clsx(
          "w-full h-[180px] p-4 border border-gray-30",
          "rounded-[10px] text-body3 resize-none outline-none"
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
