
import { getAppointments } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export function AppointmentsTab() {
  const appointments = getAppointments();

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-500 hover:bg-blue-500/90';
      case 'Completed':
        return 'bg-green-600 hover:bg-green-600/90';
      case 'Canceled':
        return 'bg-red-500 hover:bg-red-500/90';
      default:
        return 'bg-gray-500 hover:bg-gray-500/90';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming & Recent Appointments</CardTitle>
        <CardDescription>A log of all scheduled, completed, and canceled appointments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map(apt => (
              <TableRow key={apt.id}>
                <TableCell className="font-medium">{apt.patientName}</TableCell>
                <TableCell>{apt.doctorName}</TableCell>
                <TableCell>
                    <Badge variant="outline">{apt.department}</Badge>
                </TableCell>
                <TableCell>{format(new Date(apt.date), 'MMMM d, yyyy')}</TableCell>
                <TableCell>{apt.time}</TableCell>
                <TableCell className="text-right">
                  <Badge className={cn(getStatusClass(apt.status), 'text-white')}>
                    {apt.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
