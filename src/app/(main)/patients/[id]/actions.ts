'use server';

import { generatePatientImprovementNotes } from '@/ai/flows/generate-patient-improvement-notes';
import { addPatient as addPatientData } from '@/lib/data';
import type { Patient, VitalSign, Medication, TestReport } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function generateNotesForPatient(
  patient: Patient,
  vitals: VitalSign[],
  medications: Medication[],
  reports: TestReport[],
  existingNotes: string
) {
  try {
    const patientDetails = `Name: ${patient.name}, Date of Birth: ${patient.dateOfBirth}, Gender: ${patient.gender}, Medical History: ${patient.medicalHistory.join(', ')}`;
    const healthStatus = `Patient is currently ${patient.status}. Admitted on ${patient.admissionDate}.`;
    
    const vitalSigns = vitals.length > 0 
      ? vitals.map(v => `On ${v.date}: BP: ${v.bloodPressure}, Sugar: ${v.bloodSugar}, Heart Rate: ${v.heartRate} BPM, Temp: ${v.temperature}°F`).join('\n')
      : 'No recent vitals recorded.';
      
    const medicinesGiven = medications.length > 0
      ? medications.map(m => `${m.name} (${m.dosage}) on ${m.date} at ${m.time}`).join('\n')
      : 'No recent medications recorded.';

    const testReports = reports.length > 0
        ? reports.map(r => `${r.name} (${r.category}) on ${r.date}`).join('\n')
        : 'No test reports available.';

    const result = await generatePatientImprovementNotes({
      patientDetails,
      healthStatus,
      vitalSigns,
      ongoingTreatments: 'Treatments as per medication and vitals log.',
      medicinesGiven,
      testReports,
      improvementNotes: existingNotes || undefined,
    });

    return { improvementNotes: result.improvementNotes };
  } catch (error) {
    console.error('AI note generation failed:', error);
    return { error: 'An error occurred while generating notes with AI.' };
  }
}

export async function addPatient(formData: Omit<Patient, 'id' | 'status' | 'admissionDate' | 'dischargeDate' | 'avatarId'>) {
    try {
        addPatientData(formData);
        revalidatePath('/patients');
        return { success: true }
    } catch (error) {
        console.error('Failed to add patient:', error);
        return { success: false, error: 'Failed to add patient.' }
    }
}
