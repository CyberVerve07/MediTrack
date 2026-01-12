
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Calendar, PlusCircle } from 'lucide-react';
import { DoctorsTab } from './_components/doctors-tab';
import { AppointmentsTab } from './_components/appointments-tab';
import { Button } from '@/components/ui/button';
import { NewAppointmentForm } from './_components/new-appointment-form';

export default function SchedulePage() {
  const tabs = [
    { value: 'appointments', label: 'Appointments', icon: Calendar, component: <AppointmentsTab /> },
    { value: 'doctors', label: 'Doctors', icon: Stethoscope, component: <DoctorsTab /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold tracking-tight">Hospital Schedule</h1>
         <NewAppointmentForm>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Book Appointment
            </Button>
         </NewAppointmentForm>
      </div>
       <Tabs defaultValue="appointments">
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
