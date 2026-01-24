
'use server';

import { generatePatientImprovementNotes } from '@/ai/flows/generate-patient-improvement-notes';
import { addPatient as addPatientData, dischargePatient as dischargePatientData, editPatient as editPatientData, addVitalSign as addVitalSignData, updateMeal as updateMealData, updatePatientImprovementNotes } from '@/lib/data';
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

export async function addPatient(formData: Omit<Patient, 'id' | 'status' | 'admissionDate' | 'dischargeDate' | 'avatarId' | 'ward'>) {
    try {
        addPatientData(formData);
        revalidatePath('/patients');
        revalidatePath('/icu');
        return { success: true }
    } catch (error) {
        console.error('Failed to add patient:', error);
        return { success: false, error: 'Failed to add patient.' }
    }
}

export async function editPatient(patientId: string, formData: Omit<Patient, 'id' | 'status' | 'admissionDate' | 'dischargeDate' | 'avatarId' | 'ward'>) {
    try {
        editPatientData(patientId, formData);
        revalidatePath('/patients');
        revalidatePath(`/patients/${patientId}`);
        revalidatePath('/icu');
        return { success: true }
    } catch (error) {
        console.error('Failed to edit patient:', error);
        return { success: false, error: 'Failed to edit patient.' }
    }
}


export async function dischargePatient(patientId: string) {
    try {
        dischargePatientData(patientId);
        revalidatePath('/patients');
        revalidatePath(`/patients/${patientId}`);
        revalidatePath('/icu');
        return { success: true }
    } catch (error) {
        console.error('Failed to discharge patient:', error);
        return { success: false, error: 'Failed to discharge patient.' }
    }
}

export async function addVitalSign(patientId: string, vitalData: Omit<VitalSign, 'id' | 'patientId' | 'date'>) {
    try {
        addVitalSignData(patientId, vitalData);
        revalidatePath(`/patients/${patientId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to add vital sign:', error);
        return { success: false, error: 'Failed to add vital sign.' };
    }
}

export async function updatePatientMeal(patientId: string, mealId: string, newItemIds: string[]) {
    try {
        updateMealData(mealId, newItemIds);
        revalidatePath(`/patients/${patientId}`);
        revalidatePath('/meals');
        return { success: true };
    } catch (error) {
        console.error('Failed to update meal:', error);
        return { success: false, error: 'Failed to update meal.' };
    }
}

export async function savePatientNotes(patientId: string, notes: string) {
    try {
        updatePatientImprovementNotes(patientId, notes);
        revalidatePath(`/patients/${patientId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to save notes:', error);
        return { success: false, error: 'Failed to save notes.' };
    }
}
