import Dropdown from "@/src/components/common/Dropdown/Dropdown";
import { categoryOptions } from "../constants/categoryOptions";
import { StoreFieldChange } from "../type";

interface Props {
  value: string;
  error?: string;
  onChange: StoreFieldChange;
}

export default function CategorySelector({ value, error, onChange }: Props) {
  return (
    <Dropdown
      label="분류"
      placeholder="선택"
      value={value}
      error={error}
      options={categoryOptions}
      onChangeValue={(v) => onChange("category", v)}
    />
  );
}
