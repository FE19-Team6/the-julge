import Input from "@/src/components/common/Input/Input";
import { StoreFieldChange } from "../type";

interface Props {
  value: string;
  error?: string;
  onChange: StoreFieldChange;
}

export default function StoreNameField({ value, error, onChange }: Props) {
  return (
    <Input
      label="가게 이름"
      placeholder="입력"
      value={value}
      error={error}
      onChange={(e) => onChange("storeName", e.target.value)}
    />
  );
}
