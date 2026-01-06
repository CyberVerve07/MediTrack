export type PatientStatus = 'Admitted' | 'Discharged' | 'ICU';

export interface Patient {
  id: string;
  name: string;
  avatarId: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  address: string;
  medicalHistory: string[];
  admissionDate: string;
  dischargeDate: string | null;
  status: PatientStatus;
  improvementNotes?: string;
  roomNumber?: string;
  ward: string;
}

export interface VitalSign {
  id: string;
  patientId: string;
  date: string;
  bloodPressure: string;
  bloodSugar: string;
  heartRate: number;
  temperature: number;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  time: string;
  date: string;
}

export interface TestReport {
  id: string;
  patientId: string;
  name: string;
  category: 'Blood Test' | 'X-Ray' | 'MRI' | 'Urine Test';
  date: string;
  url: string;
}

export interface BillableItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Billing {
  patientId: string;
  items: BillableItem[];
  total: number;
}

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    availability: string[];
    opdDays: string[];
    opdHours: string;
}

export interface Department {
    id: string;
    name: string;
    head: string;
    description: string;
    doctors: Doctor[];
    opdSchedule: string;
    operationDays: string;
}

export interface Appointment {
    id: string;
    patientName: string;
    doctorName: string;
    department: string;
    date: string;
    time: string;
    status: 'Scheduled' | 'Completed' | 'Canceled';
}
