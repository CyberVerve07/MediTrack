import type { Patient } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

type ProfileTabProps = {
  patient: Patient;
};

function InfoItem({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-base">{value || 'N/A'}</p>
    </div>
  );
}

export function ProfileTab({ patient }: ProfileTabProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InfoItem label="Date of Birth" value={format(new Date(patient.dateOfBirth), 'MMMM d, yyyy')} />
          <InfoItem label="Gender" value={patient.gender} />
          <InfoItem label="Contact" value={patient.contact} />
          <InfoItem label="Address" value={patient.address} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <InfoItem label="Admission Date" value={format(new Date(patient.admissionDate), 'MMMM d, yyyy')} />
          <InfoItem
            label="Discharge Date"
            value={
              patient.dischargeDate
                ? format(new Date(patient.dischargeDate), 'MMMM d, yyyy')
                : 'N/A'
            }
          />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Medical History</p>
            <ul className="list-disc pl-5">
              {patient.medicalHistory.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
