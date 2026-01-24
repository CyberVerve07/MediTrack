'use client';

import type { Patient, VitalSign, Medication, TestReport } from '@/lib/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateNotesForPatient, savePatientNotes } from '../actions';

type ImprovementNotesTabProps = {
  patient: Patient;
  vitals: VitalSign[];
  medications: Medication[];
  reports: TestReport[];
};

export function ImprovementNotesTab({
  patient,
  vitals,
  medications,
  reports,
}: ImprovementNotesTabProps) {
  const [notes, setNotes] = useState(patient.improvementNotes || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleGenerateNotes = async () => {
    setIsLoading(true);
    try {
      const result = await generateNotesForPatient(
        patient,
        vitals,
        medications,
        reports,
        notes
      );
      if (result.improvementNotes) {
        setNotes(result.improvementNotes);
        toast({
          title: 'Notes Generated',
          description: 'AI-powered improvement notes have been successfully generated.',
        });
      } else if (result.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Failed to generate notes:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description:
          'Could not generate improvement notes at this time. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      const result = await savePatientNotes(patient.id, notes);
      if (result.success) {
        toast({
          title: 'Notes Saved',
          description: 'Patient improvement notes have been saved.',
        });
      } else {
        throw new Error(result.error || 'An unknown error occurred');
      }
    } catch (error) {
      console.error('Failed to save notes:', error);
      toast({
        variant: 'destructive',
        title: 'Save Failed',
        description: 'Could not save notes at this time. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Health History Tracker</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Textarea
          placeholder="Enter or generate improvement notes..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={10}
        />
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleGenerateNotes}
            disabled={isLoading || isSaving}
            variant="outline"
          >
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate with AI
          </Button>
          <Button onClick={handleSaveNotes} disabled={isSaving || isLoading}>
            {isSaving && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Save Notes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
