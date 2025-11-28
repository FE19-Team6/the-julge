import Textarea from "@/src/components/Textarea/Textarea";
import { StoreFieldChange } from "../type";

interface Props {
  value: string;
  onChange: StoreFieldChange;
}

export default function DescriptionField({ value, onChange }: Props) {
  return (
    <div className="col-span-2">
      <label>가게 정보</label>
      <Textarea
        placeholder="입력"
        value={value}
        onChange={(e) => onChange("description", e.target.value)}
      />
    </div>
  );
}
