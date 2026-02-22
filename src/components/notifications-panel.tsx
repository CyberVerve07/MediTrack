'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Activity, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type NotificationType = 'vital' | 'appointment' | 'alert' | 'info';

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  href?: string;
  unread?: boolean;
}

const notifications: NotificationItem[] = [
  {
    id: '1',
    type: 'vital',
    title: 'Vital alert',
    message: 'Rohan Mehra — BP elevated. Last reading 148/92.',
    time: '5 min ago',
    href: '/patients/2',
    unread: true,
  },
  {
    id: '2',
    type: 'appointment',
    title: 'Upcoming appointment',
    message: 'Dr. Sharma — General check-up at 10:30 AM.',
    time: '1 hr ago',
    href: '/schedule',
    unread: true,
  },
  {
    id: '3',
    type: 'alert',
    title: 'ICU monitor',
    message: 'Patient in ICU-02 — vitals stable.',
    time: '2 hrs ago',
    href: '/icu',
  },
  {
    id: '4',
    type: 'info',
    title: 'New admission',
    message: 'Meera Reddy admitted to Ward 305B.',
    time: '3 hrs ago',
    href: '/patients/5',
  },
];

const typeConfig: Record<NotificationType, { icon: typeof Bell; className: string }> = {
  vital: { icon: Activity, className: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
  appointment: { icon: Calendar, className: 'bg-primary/15 text-primary' },
  alert: { icon: AlertCircle, className: 'bg-red-500/15 text-red-600 dark:text-red-400' },
  info: { icon: Bell, className: 'bg-muted text-muted-foreground' },
};

export function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground animate-scale-in">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {notifications.map((item, i) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;
              const content = (
                <div
                  className={cn(
                    'flex gap-3 px-6 py-4 transition-colors hover:bg-muted/50',
                    item.unread && 'bg-primary/5'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                      config.className
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.message}</p>
                    <p className="text-xs text-muted-foreground/80 mt-1">{item.time}</p>
                  </div>
                </div>
              );
              return (
                <div
                  key={item.id}
                  className="animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  {item.href ? (
                    <Link href={item.href} onClick={() => setOpen(false)}>
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground text-sm">
            <Bell className="h-10 w-10 mb-3 opacity-40" />
            <p>No notifications yet.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
