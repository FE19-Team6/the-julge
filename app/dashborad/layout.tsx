export const metadata = {
  title: '대시보드 | The Julge',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      {/* <Sidebar /> */}
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
