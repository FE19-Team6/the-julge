import Link from "next/link";

interface FooterLinkProps {
  href: string;
  label: string;
}

export default function FooterLink({ href, label }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="hover:text-gray-800 transition-colors duration-200"
    >
      {label}
    </Link>
  );
}
