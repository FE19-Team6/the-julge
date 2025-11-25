export default function Skeleton() {
  return (
    <div className="w-full max-w-[964px] mx-auto">
      {/* 그리드 레이아웃 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 단일 카드 스켈레톤 */}
        <div className="w-full border border-gray-20 p-4 rounded-[12px] animate-pulse">
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

      </div>
    </div>
  );
}
