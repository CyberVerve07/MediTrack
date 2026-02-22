
import { getDepartments } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building, User, Phone, MapPin } from 'lucide-react';
import type { Department } from '@/lib/types';

const departmentGradients = [
  'from-cyan-500 to-blue-500',
  'from-sky-500 to-indigo-500',
  'from-violet-500 to-fuchsia-500',
  'from-purple-500 to-pink-500',
  'from-rose-500 to-red-500',
  'from-emerald-500 to-green-500',
  'from-amber-500 to-orange-500',
];

export default function DepartmentsPage() {
  const departments = getDepartments();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
          <p className="text-sm text-muted-foreground mt-1">Hospital departments and contacts</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {departments.map((dept, index) => (
          <div
            key={dept.id}
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${0.05 + index * 0.06}s`, animationFillMode: 'forwards' }}
          >
            <DepartmentCard
              department={dept}
              gradient={departmentGradients[index % departmentGradients.length]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DepartmentCard({ department, gradient }: { department: Department, gradient: string }) {
    return (
        <Card className={`relative overflow-hidden text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br ${gradient} rounded-xl`}>
            <CardHeader className="relative flex flex-col gap-2 p-6">
                <div className='flex items-center gap-3'>
                    <Building className="h-8 w-8" />
                    <CardTitle className="text-2xl font-bold tracking-tight">{department.name}</CardTitle>
                </div>
                 <CardDescription className="text-primary-foreground/80">{department.description}</CardDescription>
            </CardHeader>
            <CardContent className="relative p-6 pt-0 text-sm">
                <div className="space-y-3">
                    <InfoItem icon={User} label="Department Head" value={department.head} />
                    <InfoItem icon={MapPin} label="Location" value={department.location} />
                    <InfoItem icon={Phone} label="Contact" value={department.contact} />
                </div>
                <Separator className="my-4 bg-primary-foreground/20" />
                <div>
                    <h4 className="mb-3 text-base font-semibold">Doctors</h4>
                    <div className="space-y-3">
                        {department.doctors.map(doctor => (
                            <div key={doctor.id} className="flex items-start justify-between gap-2 text-xs">
                                <div className='flex items-center gap-2'>
                                    <User className="h-4 w-4 text-primary-foreground/80" />
                                    <div>
                                        <p className="font-semibold">{doctor.name}</p>
                                        <p className="text-primary-foreground/80">{doctor.specialty}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{doctor.opdDays.join(', ')}</p>
                                    <p className="text-primary-foreground/80">{doctor.opdHours}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function InfoItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | undefined | null }) {
    if (!value) return null;
    return (
        <div className="flex items-center gap-3">
            <Icon className="h-4 w-4 text-primary-foreground/80" />
            <span className='font-semibold'>{label}:</span>
            <span className="text-primary-foreground/90">{value}</span>
        </div>
    )
}
