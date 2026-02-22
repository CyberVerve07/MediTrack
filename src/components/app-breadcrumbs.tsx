'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  patients: 'Patients',
  departments: 'Departments',
  icu: 'ICU',
  schedule: 'Schedule',
  meals: 'Meals',
  settings: 'Settings',
};

export function AppBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((segment, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/');
    const label = routeLabels[segment] ?? segment;
    return { href, label, isLast: i === segments.length - 1 };
  });

  if (breadcrumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-muted-foreground animate-fade-in"
    >
      {breadcrumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1.5">
          {i > 0 && (
            <ChevronRight className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
          )}
          {crumb.isLast ? (
            <span className="font-medium text-foreground truncate max-w-[140px] sm:max-w-none">
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className="hover:text-foreground transition-colors truncate max-w-[100px] sm:max-w-none"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
