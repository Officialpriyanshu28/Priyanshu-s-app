
import { AdminSidebar } from "@/components/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <AdminSidebar />
        <main className="lg:pl-72">
            <div className="p-4 sm:p-6 lg:p-8">
                {children}
            </div>
        </main>
    </SidebarProvider>
  );
}
