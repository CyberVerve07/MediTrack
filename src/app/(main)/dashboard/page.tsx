
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
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Currently Admitted',
      value: admittedPatients,
      icon: Bed,
      href: '/patients',
      description: 'Patients in care',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Vitals Monitored',
      value: vitalSigns.length,
      icon: Activity,
      href: '#',
      description: 'Total readings today',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Discharged',
      value: dischargedPatients,
      icon: CheckCircle,
      href: '/patients',
      description: 'Completed treatments',
      color: 'from-gray-500 to-gray-600',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Card className="relative overflow-hidden border-0 shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Healthcare background"
          fill
          className="object-cover"
          data-ai-hint="healthcare background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/50" />
        <CardHeader className="relative flex flex-row items-center gap-4 space-y-0 p-8">
          <Hospital className="h-12 w-12 text-primary-foreground" />
          <div>
            <CardTitle className="text-4xl font-bold text-primary-foreground tracking-tight">
              Welcome to MediTrack Pro
            </CardTitle>
            <p className="text-primary-foreground/90 mt-2">
              Your comprehensive hospital management dashboard.
            </p>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Link href={stat.href} key={stat.title}>
            <Card className="group relative overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
               <div className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-20 transition-all duration-500 group-hover:scale-[8]`} />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-4xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20">
                 <p className="text-muted-foreground">
                    Activity feed will be displayed here.
                </p>
            </div>
          </CardContent>
        </Card>
         <Card className="bg-gradient-to-br from-accent to-blue-500 text-white">
          <CardHeader>
            <CardTitle className="font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button variant="secondary" asChild>
                <Link href="/patients">
                    View All Patients
                </Link>
            </Button>
            <Button variant="secondary" asChild>
                 <Link href="/icu">
                    Go to ICU Monitor
                </Link>
            </Button>
             <Button variant="secondary" asChild>
                 <Link href="/schedule">
                    Check Schedules
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
