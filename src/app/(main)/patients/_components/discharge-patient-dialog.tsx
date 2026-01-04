'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { dischargePatient } from '../[id]/actions';
import type { Patient } from '@/lib/types';
import { LoaderCircle } from 'lucide-react';

type DischargePatientDialogProps = {
  patient: Patient;
  children: React.ReactNode;
};

export function DischargePatientDialog({
  patient,
  children,
}: DischargePatientDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDischarge = async () => {
    setIsSubmitting(true);
    try {
      const result = await dischargePatient(patient.id);
      if (result.success) {
        toast({
          title: 'Patient Discharged',
          description: `${patient.name} has been successfully discharged.`,
        });
        setOpen(false);
        router.refresh();
      } else {
        throw new Error(result.error || 'An unknown error occurred');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Failed to Discharge Patient',
        description:
          'An error occurred while discharging the patient. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will mark {patient.name} as discharged. This cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDischarge}
              disabled={isSubmitting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isSubmitting && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Discharge
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
