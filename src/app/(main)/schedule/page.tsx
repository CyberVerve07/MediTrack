import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Calendar } from 'lucide-react';
import { DoctorsTab } from './_components/doctors-tab';
import { AppointmentsTab } from './_components/appointments-tab';

export default function SchedulePage() {
  const tabs = [
    { value: 'doctors', label: 'Doctors', icon: Stethoscope, component: <DoctorsTab /> },
    { value: 'appointments', label: 'Appointments', icon: Calendar, component: <AppointmentsTab /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Hospital Schedule</h1>
       <Tabs defaultValue="doctors">
        <TabsList className="grid w-full grid-cols-2">
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
