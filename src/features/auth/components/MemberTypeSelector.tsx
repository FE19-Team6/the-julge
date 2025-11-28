import clsx from "clsx";
import CheckIcon from "@/assets/check.svg";
import CheckOffIcon from "@/assets/check-off.svg";

interface MembersTypeSelectorProps {
  memberType: "employee" | "employer";
  setMemberType: (type: "employee" | "employer") => void;
}

export default function MembersTypeSelector({
  memberType,
  setMemberType,
}: MembersTypeSelectorProps) {
  
  const baseButtonDesign =
    "flex-1 flex items-center justify-center h-[50px] rounded-full gap-2 border transition cursor-pointer";

  return (
    <div>
      <p className="text-body2 font-bold text-black mb-2">회원유형</p>
      <div className="flex gap-3">
        
        {/* 알바님 */}
        <button
          type="button"
          onClick={() => setMemberType("employee")}
          className={clsx(
            baseButtonDesign,
            memberType === "employee"
              ? "font-bold border-red-40 text-red-50 bg-red-10"
              : "border-gray-30 text-gray-40"
          )}
        >
          {memberType === "employee" ? <CheckIcon /> : <CheckOffIcon />}
          <span>알바님</span>
        </button>

        {/* 사장님 */}
        <button
          type="button"
          onClick={() => setMemberType("employer")}
          className={clsx(
            baseButtonDesign,
            memberType === "employer"
              ? "font-bold border-red-40 text-red-50 bg-red-10"
              : "border-gray-30 text-gray-40"
          )}
        >
          {memberType === "employer" ? <CheckIcon /> : <CheckOffIcon />}
          <span>사장님</span>
        </button>
      </div>
    </div>
  );
}
