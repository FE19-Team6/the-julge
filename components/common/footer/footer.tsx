"use client";

import FooterLink from "./FooterLink";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F2F2F3] border-t border-gray-300 py-6">
      <div
        className="mx-auto w-full max-w-[1200px] px-4 
          flex items-center justify-between whitespace-nowrap"
      >
        {/* LEFT */}
        <span className="text-sm text-gray-600 flex-shrink-0">
          © codeit – 2023
        </span>

        {/* CENTER */}
        <nav className="flex items-center gap-6 text-sm text-gray-600 flex-shrink-0">
          <FooterLink href="/privacy-policy" label="Privacy Policy" />
          <FooterLink href="/faq" label="FAQ" />
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <SocialIcon type="mail" href="#" />
          <SocialIcon type="facebook" href="#" />
          <SocialIcon type="instagram" href="#" />
        </div>
      </div>
    </footer>
  );
}
