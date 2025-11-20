export const metadata = {
  title: "공통 타이틀",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <header>헤더</header>
        <main>{children}</main>
        <footer>푸터</footer>
      </body>
    </html>
  );
}

