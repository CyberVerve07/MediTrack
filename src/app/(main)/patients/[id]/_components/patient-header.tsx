import type { Patient } from '@/lib/types';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { differenceInYears } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type PatientHeaderProps = {
  patient: Patient;
};

export function PatientHeader({ patient }: PatientHeaderProps) {
  const avatar = getPlaceholderImage(patient.avatarId);
  const age = differenceInYears(new Date(), new Date(patient.dateOfBirth));

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <Avatar className="h-24 w-24 border">
        {avatar && <AvatarImage src={avatar.imageUrl} alt={patient.name} data-ai-hint={avatar.imageHint} />}
        <AvatarFallback className="text-3xl">{patient.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold md:text-3xl">{patient.name}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            {patient.gender}, {age} years old
          </span>
          <Badge
            variant={patient.status === 'Admitted' ? 'default' : 'secondary'}
            className={patient.status === 'Admitted' ? 'bg-green-600' : ''}
          >
            {patient.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
