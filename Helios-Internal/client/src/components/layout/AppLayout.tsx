import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-[240px] min-h-screen">
        <div className="p-6 max-w-[1600px]">{children}</div>
      </main>
    </div>
  );
}
