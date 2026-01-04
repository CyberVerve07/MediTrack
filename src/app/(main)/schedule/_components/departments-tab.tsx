import { getDepartments } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Calendar, Clock, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function DepartmentsTab() {
  const departments = getDepartments();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {departments.map(dept => (
        <Card key={dept.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{dept.name}</CardTitle>
            <CardDescription>Headed by: {dept.head}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 flex-grow">
            <p className="text-sm text-muted-foreground">{dept.description}</p>
            
            <Separator />

            <div className="grid gap-2">
                <h4 className="font-semibold flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    OPD Schedule
                </h4>
                <p className="text-sm text-muted-foreground">{dept.opdSchedule}</p>
            </div>

            <div className="grid gap-2">
                <h4 className="font-semibold flex items-center text-sm">
                    <Activity className="mr-2 h-4 w-4 text-primary" />
                    Operation Days
                </h4>
                <p className="text-sm text-muted-foreground">{dept.operationDays}</p>
            </div>

            <Separator />

            <div>
                <h4 className="mb-2 font-semibold flex items-center text-sm">
                    <Stethoscope className="mr-2 h-4 w-4 text-primary" />
                    Doctors
                </h4>
                <div className="grid gap-3">
                    {dept.doctors.map(doc => (
                        <div key={doc.id} className="text-sm">
                            <p className="font-medium">{doc.name} <span className="text-xs text-muted-foreground">({doc.specialty})</span></p>
                            <div className="flex items-center text-muted-foreground mt-1">
                                <Clock className="mr-2 h-3 w-3" />
                                <p className="text-xs">OPD: {doc.opdDays.join(', ')} ({doc.opdHours})</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
