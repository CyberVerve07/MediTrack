'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from '@/components/theme-provider';
import { Settings as SettingsIcon, Moon, Sun, Monitor, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your MediTrack Pro preferences</p>
      </div>

      <Card className="border-border/80 dark:border-white/10 dark:ring-1 dark:ring-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Choose light, dark, or system theme. Changes apply instantly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Label className="text-base">Theme</Label>
              <p className="text-sm text-muted-foreground">
                Current: {theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}
              </p>
            </div>
            <ThemeToggle />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={theme === 'light' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('light')}>
              <Sun className="mr-2 h-4 w-4" /> Light
            </Button>
            <Button variant={theme === 'dark' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('dark')}>
              <Moon className="mr-2 h-4 w-4" /> Dark
            </Button>
            <Button variant={theme === 'system' ? 'default' : 'outline'} size="sm" onClick={() => setTheme('system')}>
              <Monitor className="mr-2 h-4 w-4" /> System
            </Button>
          </div>
          <Separator />
        </CardContent>
      </Card>

      <Card className="border-border/80 dark:border-white/10 dark:ring-1 dark:ring-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Configure how you receive alerts and updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Critical alerts</Label>
              <p className="text-sm text-muted-foreground">Vitals, ICU, and emergency notifications</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Appointment reminders</Label>
              <p className="text-sm text-muted-foreground">Schedule and booking reminders</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Email digest</Label>
              <p className="text-sm text-muted-foreground">Daily or weekly summary emails</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/80 dark:border-white/10 dark:ring-1 dark:ring-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & API
          </CardTitle>
          <CardDescription>Backend connection and API settings. Use Java backend when available.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 p-4 dark:bg-muted/10">
            <p className="text-sm text-muted-foreground">
              Connect to MediTrack Java REST API (Spring Boot) by setting the API base URL in environment variables.
              Backend provides patients, vitals, appointments, and more.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
