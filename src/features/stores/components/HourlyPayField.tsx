import Input from "@/src/components/common/Input/Input";
import { StoreFieldChange } from "../type";

interface Props {
  value: number | null;
  error?: string;
  onChange: StoreFieldChange;
}

export default function HourlyPayField({ value, error, onChange }: Props) {
  return (
    <Input
      label="기본 시급"
      placeholder="10000"
      type="number"
      suffix="원"
      value={value ?? ""}
      error={error}
      onChange={(e) => onChange("originalHourlyPay", Number(e.target.value))}
    />
  );
}
