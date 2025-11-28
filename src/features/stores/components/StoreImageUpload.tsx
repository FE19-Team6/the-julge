import ImageUploader from "@/src/app/(main)/mystore/components/ImageUploader";

interface Props {
  file: File | null;
  onChangeFile: (file: File | null) => void;
}

export default function StoreImageUploader({ file, onChangeFile }: Props) {
  return (
    <div>
      <label className="mb-2 block font-medium">가게 이미지</label>
      <ImageUploader
        label="이미지 추가하기"
        file={file}
        onChange={onChangeFile}
      />
    </div>
  );
}
