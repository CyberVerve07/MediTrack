import Link from 'next/link';
import Image from 'next/image';
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
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { format, differenceInYears } from 'date-fns';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function getPatientAge(dateOfBirth: string) {
  return differenceInYears(new Date(), new Date(dateOfBirth));
}

export default function PatientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Patient
        </Button>
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
                         {avatar && <AvatarImage src={avatar.imageUrl} alt={patient.name} data-ai-hint={avatar.imageHint} />}
                         <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                       </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/patients/${patient.id}`} className="hover:underline">
                        {patient.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          patient.status === 'Admitted'
                            ? 'default'
                            : 'secondary'
                        }
                        className={patient.status === 'Admitted' ? 'bg-green-600' : ''}
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getPatientAge(patient.dateOfBirth)}
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
                          <DropdownMenuItem>
                            <Link href={`/patients/${patient.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Discharge
                          </DropdownMenuItem>
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
    </div>
  );
}
