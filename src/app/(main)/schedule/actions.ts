
'use server';

import { addAppointment as addAppointmentData } from '@/lib/data';
import type { Appointment } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function addAppointment(appointmentData: Omit<Appointment, 'id' | 'status'>) {
    try {
        addAppointmentData(appointmentData);
        revalidatePath('/schedule');
        return { success: true };
    } catch (error) {
        console.error('Failed to add appointment:', error);
        return { success: false, error: 'Failed to add appointment.' };
    }
}
