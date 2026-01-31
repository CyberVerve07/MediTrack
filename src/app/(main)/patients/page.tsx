'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { patients } from '@/lib/data';
import type { Patient } from '@/lib/types';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { format, differenceInYears } from 'date-fns';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NewPatientForm } from './_components/new-patient-form';
import { DischargePatientDialog } from './_components/discharge-patient-dialog';
import { cn } from '@/lib/utils';

const getStatusClass = (status: Patient['status']) => {
  switch (status) {
    case 'Admitted':
      return 'bg-blue-500/20 text-blue-700 border-blue-500/20';
    case 'Discharged':
      return 'bg-gray-500/20 text-gray-700 border-gray-500/20';
    case 'ICU':
      return 'bg-red-500/20 text-red-700 border-red-500/20';
    default:
      return 'bg-gray-500/20 text-gray-700 border-gray-500/20';
  }
};


export default function PatientsPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(
    undefined
  );
  const [ages, setAges] = useState<Record<string, number>>({});

  useEffect(() => {
      const calculatedAges: Record<string, number> = {};
      for (const patient of patients) {
          calculatedAges[patient.id] = differenceInYears(new Date(), new Date(patient.dateOfBirth));
      }
      setAges(calculatedAges);
  }, []);

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
        <NewPatientForm>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Patient
          </Button>
        </NewPatientForm>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Age</TableHead>
                <TableHead className="hidden md:table-cell">Ward</TableHead>
                <TableHead className="hidden md:table-cell">
                  Admission Date
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map(patient => {
                const avatar = getPlaceholderImage(patient.avatarId);
                return (
                  <TableRow key={patient.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Avatar>
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
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link
                        href={`/patients/${patient.id}`}
                        className="hover:underline"
                      >
                        {patient.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn('font-medium', getStatusClass(patient.status))}
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {ages[patient.id] ?? '...'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {patient.ward}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(patient.admissionDate), 'MMMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/patients/${patient.id}`}>
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(patient)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DischargePatientDialog patient={patient}>
                            <DropdownMenuItem
                              onSelect={e => e.preventDefault()}
                              className="text-destructive"
                              disabled={patient.status === 'Discharged'}
                            >
                              Discharge
                            </DropdownMenuItem>
                          </DischargePatientDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <NewPatientForm
        patient={selectedPatient}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        {/* This is a controlled dialog, trigger is managed externally */}
        <span />
      </NewPatientForm>
    </div>
  );
}
