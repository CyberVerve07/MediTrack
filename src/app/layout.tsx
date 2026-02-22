import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'MediTrack Pro',
  description: 'Comprehensive hospital management system.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var k = 'meditrack-theme';
                var v = localStorage.getItem(k);
                var dark = v === 'dark' || (v !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.classList.add(dark ? 'dark' : 'light');
              })();
            `,
          }}
        />
      </head>
      <body className={cn('antialiased', fontSans.variable)}>
        <ThemeProvider defaultTheme="system" storageKey="meditrack-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
