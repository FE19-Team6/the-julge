import Input from "@/src/components/common/Input/Input";
import { StoreFieldChange } from "../type";

interface Props {
  value: string;
  error?: string;
  onChange: StoreFieldChange;
}

export default function DetailAddressField({ value, error, onChange }: Props) {
  return (
    <Input
      label="상세 주소"
      placeholder="입력"
      value={value}
      error={error}
      onChange={(e) => onChange("detailAddress", e.target.value)}
    />
  );
}
