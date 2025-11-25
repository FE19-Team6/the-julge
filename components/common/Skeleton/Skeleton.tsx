export default function Skeleton() {
  return (
    // 반응형 카드 최대 너비 및 로딩 애니메이션 설정
    <div
      className="
        animate-pulse border border-gray-20 p-4 rounded-[12px]
        w-full
        max-w-[170px]
        md:max-w-[332px]  
        lg:max-w-[312px]  
      "
    >
      {/* 이미지 스켈레톤 */}
      <div className="w-full rounded-xl bg-gray-20 h-[100px] md:h-[160px] lg:h-[170px]" />

      {/* 텍스트 스켈레톤 */}
      <div className="mt-4 space-y-3">
        <div className="h-4 w-1/2 bg-gray-20 rounded" />
        <div className="h-4 w-3/4 bg-gray-20 rounded" />
        <div className="h-4 w-2/3 bg-gray-20 rounded" />
        <div className="h-4 w-1/3 bg-gray-20 rounded" />
      </div>
    </div>
  );
}
