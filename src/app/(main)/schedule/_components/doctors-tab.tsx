import { getAllDoctors } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export function DoctorsTab() {
  const doctors = getAllDoctors();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Directory & Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>OPD Schedule</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map(doctor => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>
                    <Badge variant="secondary">{doctor.department}</Badge>
                </TableCell>
                <TableCell>
                    {doctor.opdDays.length > 0 ? `${doctor.opdDays.join(', ')} (${doctor.opdHours})` : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
