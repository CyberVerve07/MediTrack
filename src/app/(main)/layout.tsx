
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  CircleUser,
  CalendarDays,
  HeartPulse,
  Building,
  Utensils,
  Settings,
} from 'lucide-react';
import { Logo } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { NotificationsPanel } from '@/components/notifications-panel';
import { AppBreadcrumbs } from '@/components/app-breadcrumbs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/patients',
    label: 'Patients',
    icon: Users,
  },
  {
    href: '/departments',
    label: 'Departments',
    icon: Building,
  },
  {
    href: '/icu',
    label: 'ICU',
    icon: HeartPulse,
  },
  {
    href: '/schedule',
    label: 'Schedule',
    icon: CalendarDays,
  },
  {
    href: '/meals',
    label: 'Meals',
    icon: Utensils,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <Logo className="size-8 text-sidebar-primary" />
              <span className="text-lg font-semibold text-sidebar-primary">
                MediTrack Pro
              </span>
            </div>
          </SidebarHeader>
          <SidebarMenu>
            {menuItems.map(item => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="relative hidden w-full max-w-md flex-1 items-center md:flex">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients, schedule..."
              className="h-9 w-full rounded-full border-border/80 bg-muted/50 pl-9 focus-visible:ring-2"
            />
          </div>
          <div className="flex items-center justify-end gap-1">
            <ThemeToggle />
            <NotificationsPanel />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-4 md:mb-5">
            <AppBreadcrumbs />
          </div>
          <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}>
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
