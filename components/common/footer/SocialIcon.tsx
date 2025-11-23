import React from "react";
import Link from "next/link";
import { Mail, Facebook, Instagram } from "lucide-react";

interface SocialIconProps {
  type: "mail" | "facebook" | "instagram";
  href: string;
  target?: string;
}

export default function SocialIcon({ type, href, target }: SocialIconProps) {
  const IconComponent = {
    mail: Mail,
    facebook: Facebook,
    instagram: Instagram,
  }[type];

  return (
    <Link href={href} target={target} aria-label={type}>
      <IconComponent className="w-5 h-5 text-gray-500 hover:text-gray-800 transition" />
    </Link>
  );
}
