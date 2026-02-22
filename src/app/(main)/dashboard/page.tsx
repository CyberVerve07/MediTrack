
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bed, Users, Activity, CheckCircle, Hospital } from 'lucide-react';
import { patients, vitalSigns } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const totalPatients = patients.length;
  const admittedPatients = patients.filter(
    p => p.status === 'Admitted' || p.status === 'ICU'
  ).length;
  const dischargedPatients = patients.filter(
    p => p.status === 'Discharged'
  ).length;

  const stats = [
    {
      title: 'Total Patients',
      value: totalPatients,
      icon: Users,
      href: '/patients',
      description: 'All-time patient records',
      color: 'from-primary to-blue-400',
    },
    {
      title: 'Currently Admitted',
      value: admittedPatients,
      icon: Bed,
      href: '/patients',
      description: 'Patients in care',
      color: 'from-green-500 to-emerald-400',
    },
    {
      title: 'Vitals Monitored',
      value: vitalSigns.length,
      icon: Activity,
      href: '#',
      description: 'Total readings today',
      color: 'from-amber-500 to-orange-400',
    },
    {
      title: 'Discharged',
      value: dischargedPatients,
      icon: CheckCircle,
      href: '/patients',
      description: 'Completed treatments',
      color: 'from-slate-500 to-gray-400',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Card className="relative overflow-hidden border-0 shadow-xl ring-1 ring-border/50 dark:ring-white/5">
        <Image
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Healthcare background"
          fill
          className="object-cover opacity-90 dark:opacity-70"
          data-ai-hint="healthcare background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-accent/60 dark:from-primary/80 dark:to-accent/50" />
        <CardHeader className="relative flex flex-row items-center gap-6 space-y-0 p-8 md:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Hospital className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              Welcome to MediTrack Pro
            </CardTitle>
            <p className="mt-2 max-w-xl text-primary-foreground/90">
              Your comprehensive hospital management dashboard. Manage patients, schedules, and care in one place.
            </p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Link href={stat.href} key={stat.title}>
            <Card className="group relative overflow-hidden border-border/80 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 dark:border-white/10 dark:shadow-none dark:ring-1 dark:ring-white/5">
              <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${stat.color} opacity-20 transition-transform duration-300 group-hover:scale-110`} />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/80 dark:border-white/10 dark:ring-1 dark:ring-white/5">
          <CardHeader>
            <CardTitle className="font-bold">Recent Activity</CardTitle>
            <p className="text-sm text-muted-foreground">Latest updates across the hospital</p>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 dark:bg-muted/10">
              <p className="text-sm text-muted-foreground">Activity feed will be displayed here.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-accent to-primary text-accent-foreground shadow-lg dark:from-accent/90 dark:to-primary/80">
          <CardHeader>
            <CardTitle className="font-bold text-white">Quick Actions</CardTitle>
            <p className="text-sm text-white/80">Shortcuts to key sections</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button variant="secondary" className="w-full justify-start bg-white/20 hover:bg-white/30" asChild>
              <Link href="/patients">View All Patients</Link>
            </Button>
            <Button variant="secondary" className="w-full justify-start bg-white/20 hover:bg-white/30" asChild>
              <Link href="/icu">Go to ICU Monitor</Link>
            </Button>
            <Button variant="secondary" className="w-full justify-start bg-white/20 hover:bg-white/30" asChild>
              <Link href="/schedule">Check Schedules</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
