
import { notFound } from 'next/navigation';
import {
  getPatientById,
  getVitalsByPatientId,
  getMedicationsByPatientId,
  getTestReportsByPatientId,
  getBillingByPatientId,
  getMealsByPatientId,
} from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  HeartPulse,
  Pill,
  FileText,
  DollarSign,
  Sparkles,
  Utensils,
} from 'lucide-react';

import { PatientHeader } from './_components/patient-header';
import { ProfileTab } from './_components/profile-tab';
import { VitalsTab } from './_components/vitals-tab';
import { MedicationTab } from './_components/medication-tab';
import { ReportsTab } from './_components/reports-tab';
import { BillingTab } from './_components/billing-tab';
import { ImprovementNotesTab } from './_components/improvement-notes-tab';
import { MealsTab } from './_components/meals-tab';

export default function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const patient = getPatientById(params.id);
  if (!patient) {
    notFound();
  }

  const vitals = getVitalsByPatientId(params.id);
  const medications = getMedicationsByPatientId(params.id);
  const reports = getTestReportsByPatientId(params.id);
  const billing = getBillingByPatientId(params.id);
  const meals = getMealsByPatientId(params.id);

  const tabs = [
    { value: 'profile', label: 'Profile', icon: User, component: <ProfileTab patient={patient} /> },
    { value: 'vitals', label: 'Vitals', icon: HeartPulse, component: <VitalsTab patient={patient} vitals={vitals} /> },
    { value: 'medication', label: 'Medication', icon: Pill, component: <MedicationTab medications={medications} /> },
    { value: 'meals', label: 'Meals', icon: Utensils, component: <MealsTab patient={patient} meals={meals} /> },
    { value: 'reports', label: 'Reports', icon: FileText, component: <ReportsTab reports={reports} /> },
    { value: 'billing', label: 'Billing', icon: DollarSign, component: <BillingTab billing={billing} /> },
    { value: 'notes', label: 'AI Health Tracker', icon: Sparkles, component: <ImprovementNotesTab patient={patient} vitals={vitals} medications={medications} reports={reports} /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PatientHeader patient={patient} />
      <Tabs defaultValue="profile">
        <div className="w-full overflow-x-auto pb-2">
          <TabsList className="w-max">
            {tabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
                {tab.component}
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
