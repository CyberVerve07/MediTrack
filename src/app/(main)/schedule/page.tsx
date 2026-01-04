import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Stethoscope, Calendar } from 'lucide-react';
import { DepartmentsTab } from './_components/departments-tab';

export default function SchedulePage() {
  const tabs = [
    { value: 'departments', label: 'Departments', icon: Building, component: <DepartmentsTab /> },
    { value: 'doctors', label: 'Doctors', icon: Stethoscope, component: <p className="text-muted-foreground">Doctor availability will be displayed here.</p> },
    { value: 'appointments', label: 'Appointments', icon: Calendar, component: <p className="text-muted-foreground">Appointment schedule will be displayed here.</p> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Hospital Schedule</h1>
       <Tabs defaultValue="departments">
        <TabsList className="grid w-full grid-cols-3">
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
                {tab.component}
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
