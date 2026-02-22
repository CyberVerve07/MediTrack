'use client';

import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  patients,
  getVitalsByPatientId,
  getMedicationsByPatientId,
  getTestReportsByPatientId
} from '@/lib/data';
import type { Patient, VitalSign, Medication, TestReport } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { differenceInYears } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Activity, Droplets, Thermometer, HeartPulse, FileText, Pill } from 'lucide-react';
import { useEffect, useState } from 'react';

const icuPatients = patients.filter(p => p.status === 'ICU');

const LatestVitals = ({ patientId }: { patientId: string }) => {
    const vitals = getVitalsByPatientId(patientId);
    const latest = vitals[vitals.length - 1];
    if (!latest) return <p className="text-sm text-muted-foreground">No vitals</p>;
    
    return (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> {latest.bloodPressure}</span>
            <span className="flex items-center gap-1.5"><HeartPulse className="w-3.5 h-3.5" /> {latest.heartRate} bpm</span>
            <span className="flex items-center gap-1.5"><Droplets className="w-3.5 h-3.5" /> {latest.bloodSugar}</span>
            <span className="flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5" /> {latest.temperature}°F</span>
        </div>
    )
}

const RecentMeds = ({ patientId }: { patientId: string }) => {
    const meds = getMedicationsByPatientId(patientId).slice(-2);
     if (meds.length === 0) return <p className="text-sm text-muted-foreground">No recent meds</p>;

    return (
        <div className="flex flex-col gap-1 text-sm">
            {meds.map(m => (
                <span key={m.id} className="flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5" /> {m.name} ({m.dosage}) - {m.time}
                </span>
            ))}
        </div>
    )
}

const RecentReports = ({ patientId }: { patientId: string }) => {
    const reports = getTestReportsByPatientId(patientId).slice(-2);
     if (reports.length === 0) return <p className="text-sm text-muted-foreground">No recent reports</p>;

    return (
        <div className="flex flex-col gap-1 text-sm">
            {reports.map(r => (
                <span key={r.id} className="flex items-center gap-1.5">
                   <FileText className="w-3.5 h-3.5" /> {r.name}
                </span>
            ))}
        </div>
    )
}


export default function ICUPage() {
    const [ages, setAges] = useState<Record<string, number>>({});

    useEffect(() => {
        const getPatientAge = (dateOfBirth: string) => differenceInYears(new Date(), new Date(dateOfBirth));
        
        const calculatedAges: Record<string, number> = {};
        for (const patient of icuPatients) {
            calculatedAges[patient.id] = getPatientAge(patient.dateOfBirth);
        }
        setAges(calculatedAges);
    }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="animate-fade-in-down">
        <h1 className="text-3xl font-bold tracking-tight">Intensive Care Unit (ICU)</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time monitoring of critical patients</p>
      </div>

      <Card className="border-border/80 dark:border-white/10 dark:ring-1 dark:ring-white/5 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.08s', animationFillMode: 'forwards' }}>
        <CardHeader className="border-b border-border/60 bg-muted/30 dark:bg-muted/10">
          <CardTitle>ICU Patient Overview</CardTitle>
          <CardDescription>Latest vitals, medications, and reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Latest Vitals</TableHead>
                <TableHead className="hidden lg:table-cell">Recent Medications</TableHead>
                <TableHead className="hidden lg:table-cell">Recent Reports</TableHead>
                <TableHead className="text-right">Room</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {icuPatients.map(patient => {
                const avatar = getPlaceholderImage(patient.avatarId);
                return (
                  <TableRow key={patient.id} className="[&>td]:align-top hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Avatar className="hidden sm:block">
                                {avatar && (
                                <AvatarImage
                                    src={avatar.imageUrl}
                                    alt={patient.name}
                                    data-ai-hint={avatar.imageHint}
                                />
                                )}
                                <AvatarFallback>
                                {patient.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <Link
                                    href={`/patients/${patient.id}`}
                                    className="font-semibold hover:underline"
                                >
                                    {patient.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">{patient.gender}, {ages[patient.id] !== undefined ? `${ages[patient.id]} years` : '...'}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <LatestVitals patientId={patient.id} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                        <RecentMeds patientId={patient.id} />
                    </TableCell>
                     <TableCell className="hidden lg:table-cell">
                        <RecentReports patientId={patient.id} />
                    </TableCell>
                    <TableCell className="text-right">
                        <Badge variant="destructive">{patient.roomNumber}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
