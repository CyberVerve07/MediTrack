
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bed, Users, Activity, CheckCircle, Hospital } from 'lucide-react';
import { patients, vitalSigns } from '@/lib/data';
import { CardDescription } from '@/components/ui/card';

export default function DashboardPage() {
  const totalPatients = patients.length;
  const admittedPatients = patients.filter(
    p => p.status === 'Admitted' || p.status === 'ICU'
  ).length;
  const dischargedPatients = patients.filter(
    p => p.status === 'Discharged'
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <Hospital className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="text-2xl">Welcome to MediTrack Pro</CardTitle>
              <CardDescription>Your comprehensive hospital management dashboard.</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/patients">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">
                All-time patient records
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/patients">
           <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Currently Admitted
              </CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{admittedPatients}</div>
              <p className="text-xs text-muted-foreground">Patients in care</p>
            </CardContent>
          </Card>
        </Link>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vitals Monitored Today
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vitalSigns.length}</div>
            <p className="text-xs text-muted-foreground">
              Total readings logged
            </p>
          </CardContent>
        </Card>
        <Link href="/patients">
            <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Discharged</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dischargedPatients}</div>
              <p className="text-xs text-muted-foreground">
                Total discharged patients
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Activity feed will be displayed here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
