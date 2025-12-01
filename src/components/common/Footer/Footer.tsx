import IcEmail from "@/assets/ic_email.svg";
import IcFacebook from "@/assets/ic_facebook.svg";
import IcInstargram from "@/assets/ic_instargram.svg";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-10 py-8 px-4 sm:px-8 md:px-[238px]">
      <div className="max-w-[964px] mx-auto grid grid-cols-3 items-center gap-4">
        {/* 왼쪽: 팀 정보 */}
        <span className="text-gray-500 text-sm">
          ©19기 6팀 박유진 조동현 이나래
        </span>

        {/* 가운데: 링크 - 정중앙 */}
        <div className="flex gap-4 text-gray-500 text-sm justify-center">
          <a href="/privacy" className="hover:text-gray-700">
            Privacy Policy
          </a>
          <a href="/faq" className="hover:text-gray-700">
            FAQ
          </a>
        </div>

        {/* 오른쪽: SNS 아이콘 */}
        <div className="flex gap-3 justify-end">
          <a href="mailto:contact@thejulge.com" aria-label="Email">
            <IcEmail width={22} height={22} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <IcFacebook width={22} height={22} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <IcInstargram width={22} height={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};
