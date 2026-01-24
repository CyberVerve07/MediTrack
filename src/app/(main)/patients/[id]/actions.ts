
'use server';

import { addPatient as addPatientData, dischargePatient as dischargePatientData, editPatient as editPatientData, addVitalSign as addVitalSignData, updateMeal as updateMealData } from '@/lib/data';
import type { Patient, VitalSign } from '@/lib/types';
import { revalidatePath } from 'next/cache';


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
