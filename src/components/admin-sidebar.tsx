
'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import { Button } from "./ui/button";
import { LogOut, Home, Users, BookOpen, Settings, PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/courses', label: 'Courses', icon: BookOpen },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const { toggleSidebar, open } = useSidebar();
  const pathname = usePathname();

  return (
     <Sidebar
        className="border-r"
        side="left"
        collapsible="icon"
      >
      <SidebarHeader>
        <div className={cn("flex items-center gap-2", !open && "justify-center")}>
            <Logo />
             <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={toggleSidebar}
            >
                <PanelLeft />
            </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
            {menuItems.map(item => (
                 <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                        <SidebarMenuButton 
                            isActive={pathname === item.href}
                            icon={<item.icon />}
                            tooltip={item.label}
                        >
                            <span className={cn(!open && "hidden")}>{item.label}</span>
                        </SidebarMenuButton>
                    </Link>
                 </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className={cn("p-2", !open && "items-center")}>
         <SidebarMenu>
             <SidebarMenuItem>
                <Link href="/">
                    <SidebarMenuButton icon={<LogOut />} tooltip="Logout">
                         <span className={cn(!open && "hidden")}>Logout</span>
                    </SidebarMenuButton>
                </Link>
             </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
