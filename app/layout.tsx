import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Julge',
  description: '도전하는 사람들을 위한 플랫폼 The Julge',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header>공통 헤더</header>
        <main>{children}</main>
        <footer>공통 푸터</footer>
      </body>
    </html>
  );
}




