import { getDepartments } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope } from 'lucide-react';

export function DepartmentsTab() {
  const departments = getDepartments();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {departments.map(dept => (
        <Card key={dept.id}>
          <CardHeader>
            <CardTitle>{dept.name}</CardTitle>
            <CardDescription>Headed by: {dept.head}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-sm text-muted-foreground">{dept.description}</p>
            <div>
                <h4 className="mb-2 font-semibold flex items-center">
                    <Stethoscope className="mr-2 h-4 w-4" />
                    Doctors
                </h4>
                <div className="flex flex-wrap gap-2">
                    {dept.doctors.map(doc => (
                        <Badge key={doc.id} variant="secondary">{doc.name}</Badge>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
