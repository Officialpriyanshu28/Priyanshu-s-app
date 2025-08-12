
'use client';

import { AdminSidebar } from "@/components/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Do not render admin layout on login page
    if(pathname.startsWith('/admin/auth')) {
        return <>{children}</>
    }

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
