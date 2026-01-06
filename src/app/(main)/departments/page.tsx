'use client';

import { getDepartments } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Stethoscope, Calendar, Clock, Activity, Phone, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DepartmentsPage() {
  const departments = getDepartments();

  const departmentColors = [
    'from-blue-500 to-indigo-600',
    'from-green-500 to-emerald-600',
    'from-purple-500 to-violet-600',
    'from-red-500 to-rose-600',
    'from-yellow-500 to-amber-600',
  ];

  return (
     <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Hospital Departments</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept, index) => (
          <Card key={dept.id} className={cn("flex flex-col border-0 text-white shadow-lg", departmentColors[index % departmentColors.length])}>
            <CardHeader>
              <CardTitle className="font-bold">{dept.name}</CardTitle>
              <CardDescription className="text-white/80">Headed by: {dept.head}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 flex-grow">
              <p className="text-sm text-white/90">{dept.description}</p>
              
              <div className="p-4 rounded-lg grid gap-4 bg-black/20">
                  <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 shrink-0" />
                      <span className="text-sm">{dept.doctors.length} Doctors</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 shrink-0" />
                      <span className="text-sm">{dept.contact}</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 shrink-0" />
                      <span className="text-sm">OPD: {dept.opdSchedule}</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 shrink-0" />
                      <span className="text-sm">Operations: {dept.operationDays}</span>
                  </div>
              </div>

              <div>
                  <h4 className="mb-3 font-semibold flex items-center text-sm">
                      <Stethoscope className="mr-2 h-4 w-4" />
                      Doctors on Staff
                  </h4>
                  <div className="grid gap-3">
                      {dept.doctors.map(doc => (
                          <div key={doc.id} className="text-sm p-3 rounded-md bg-black/20">
                              <p className="font-medium">{doc.name} <span className="text-xs text-white/80">({doc.specialty})</span></p>
                              <div className="flex items-center text-white/90 mt-1">
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
    </div>
  );
}
