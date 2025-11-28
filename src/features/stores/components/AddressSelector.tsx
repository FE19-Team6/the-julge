import Dropdown from "@/src/components/common/Dropdown/Dropdown";
import { addressOptions } from "../constants/adressOptions";
import { StoreFieldChange } from "../type";

interface Props {
  value: string;
  error?: string;
  onChange: StoreFieldChange;
}

export default function AddressSelector({ value, error, onChange }: Props) {
  return (
    <Dropdown
      label="주소"
      placeholder="선택"
      value={value}
      error={error}
      options={addressOptions}
      onChangeValue={(v) => onChange("address", v)}
    />
  );
}
