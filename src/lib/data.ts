import { Patient, VitalSign, Medication, TestReport, Billing } from './types';
import { subDays, format } from 'date-fns';

const today = new Date();

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatarId: 'avatar-1',
    dateOfBirth: '1985-05-15',
    gender: 'Female',
    contact: '555-0101',
    address: '123 Maple St, Springfield',
    medicalHistory: ['Hypertension', 'Asthma'],
    admissionDate: subDays(today, 10).toISOString(),
    dischargeDate: null,
    status: 'Admitted',
    improvementNotes: 'Patient is responding well to treatment. Vitals are stable. Continue monitoring respiratory status.',
  },
  {
    id: '2',
    name: 'Michael Smith',
    avatarId: 'avatar-2',
    dateOfBirth: '1972-09-20',
    gender: 'Male',
    contact: '555-0102',
    address: '456 Oak Ave, Springfield',
    medicalHistory: ['Diabetes Type 2'],
    admissionDate: subDays(today, 5).toISOString(),
    dischargeDate: null,
    status: 'Admitted',
  },
  {
    id: '3',
    name: 'Emily Davis',
    avatarId: 'avatar-4',
    dateOfBirth: '1990-02-25',
    gender: 'Female',
    contact: '555-0103',
    address: '789 Pine Ln, Springfield',
    medicalHistory: ['None'],
    admissionDate: subDays(today, 15).toISOString(),
    dischargeDate: subDays(today, 2).toISOString(),
    status: 'Discharged',
  },
  {
    id: '4',
    name: 'David Chen',
    avatarId: 'avatar-5',
    dateOfBirth: '1968-11-30',
    gender: 'Male',
    contact: '555-0104',
    address: '101 Birch Rd, Springfield',
    medicalHistory: ['High Cholesterol'],
    admissionDate: subDays(today, 20).toISOString(),
    dischargeDate: subDays(today, 10).toISOString(),
    status: 'Discharged',
  },
  {
    id: '5',
    name: 'Jessica Brown',
    avatarId: 'avatar-1',
    dateOfBirth: '1992-08-12',
    gender: 'Female',
    contact: '555-0105',
    address: '212 Elm St, Springfield',
    medicalHistory: ['Migraines'],
    admissionDate: subDays(today, 3).toISOString(),
    dischargeDate: null,
    status: 'Admitted',
  },
  {
    id: '6',
    name: 'Chris Wilson',
    avatarId: 'avatar-2',
    dateOfBirth: '1988-07-22',
    gender: 'Male',
    contact: '555-0106',
    address: '333 Cedar Blvd, Springfield',
    medicalHistory: ['Allergies'],
    admissionDate: subDays(today, 1).toISOString(),
    dischargeDate: null,
    status: 'Admitted',
  },
];

export const vitalSigns: VitalSign[] = [
  { id: 'v1', patientId: '1', date: subDays(today, 2).toISOString(), bloodPressure: '120/80', bloodSugar: '95 mg/dL', heartRate: 72, temperature: 98.6 },
  { id: 'v2', patientId: '1', date: subDays(today, 1).toISOString(), bloodPressure: '122/81', bloodSugar: '98 mg/dL', heartRate: 75, temperature: 98.7 },
  { id: 'v3', patientId: '2', date: subDays(today, 2).toISOString(), bloodPressure: '130/85', bloodSugar: '150 mg/dL', heartRate: 80, temperature: 99.0 },
  { id: 'v4', patientId: '2', date: subDays(today, 1).toISOString(), bloodPressure: '128/84', bloodSugar: '145 mg/dL', heartRate: 78, temperature: 98.9 },
  { id: 'v5', patientId: '3', date: subDays(today, 5).toISOString(), bloodPressure: '110/70', bloodSugar: '85 mg/dL', heartRate: 65, temperature: 98.4 },
  { id: 'v6', patientId: '5', date: subDays(today, 1).toISOString(), bloodPressure: '115/75', bloodSugar: '90 mg/dL', heartRate: 70, temperature: 98.5 },
  { id: 'v7', patientId: '6', date: subDays(today, 1).toISOString(), bloodPressure: '125/82', bloodSugar: '105 mg/dL', heartRate: 77, temperature: 98.8 },
];

export const medications: Medication[] = [
  { id: 'm1', patientId: '1', name: 'Lisinopril', dosage: '10mg', time: '09:00 AM', date: format(subDays(today, 1), 'yyyy-MM-dd') },
  { id: 'm2', patientId: '1', name: 'Albuterol', dosage: '2 puffs', time: '10:00 AM', date: format(subDays(today, 1), 'yyyy-MM-dd') },
  { id: 'm3', patientId: '2', name: 'Metformin', dosage: '500mg', time: '08:00 AM', date: format(subDays(today, 1), 'yyyy-MM-dd') },
  { id: 'm4', patientId: '2', name: 'Insulin', dosage: '10 units', time: '08:00 AM', date: format(subDays(today, 1), 'yyyy-MM-dd') },
  { id: 'm5', patientId: '5', name: 'Sumatriptan', dosage: '50mg', time: 'as needed', date: format(subDays(today, 2), 'yyyy-MM-dd') },
  { id: 'm6', patientId: '6', name: 'Loratadine', dosage: '10mg', time: '09:00 AM', date: format(subDays(today, 1), 'yyyy-MM-dd') },
];

export const testReports: TestReport[] = [
  { id: 'tr1', patientId: '1', name: 'Complete Blood Count', category: 'Blood Test', date: subDays(today, 9).toISOString(), url: '#' },
  { id: 'tr2', patientId: '1', name: 'Chest X-Ray', category: 'X-Ray', date: subDays(today, 8).toISOString(), url: '#' },
  { id: 'tr3', patientId: '2', name: 'HbA1c', category: 'Blood Test', date: subDays(today, 4).toISOString(), url: '#' },
];

export const billings: Billing[] = [
    {
        patientId: '1',
        items: [
            { id: 'b1', description: 'Room Charge', quantity: 10, unitPrice: 200, total: 2000 },
            { id: 'b2', description: 'Lisinopril', quantity: 10, unitPrice: 5, total: 50 },
            { id: 'b3', description: 'Chest X-Ray', quantity: 1, unitPrice: 150, total: 150 },
        ],
        total: 2200,
    },
    {
        patientId: '2',
        items: [
            { id: 'b4', description: 'Room Charge', quantity: 5, unitPrice: 200, total: 1000 },
            { id: 'b5', description: 'Metformin', quantity: 5, unitPrice: 2, total: 10 },
            { id: 'b6', description: 'HbA1c Test', quantity: 1, unitPrice: 75, total: 75 },
        ],
        total: 1085,
    },
     {
        patientId: '3',
        items: [
            { id: 'b7', description: 'Room Charge', quantity: 13, unitPrice: 180, total: 2340 },
        ],
        total: 2340,
    },
     {
        patientId: '4',
        items: [
            { id: 'b8', description: 'Room Charge', quantity: 10, unitPrice: 180, total: 1800 },
             { id: 'b9', description: 'Lipid Panel', quantity: 1, unitPrice: 90, total: 90 },
        ],
        total: 1890,
    },
    {
        patientId: '5',
        items: [
            { id: 'b10', description: 'Room Charge', quantity: 3, unitPrice: 220, total: 660 },
        ],
        total: 660,
    },
    {
        patientId: '6',
        items: [
            { id: 'b11', description: 'Room Charge', quantity: 1, unitPrice: 220, total: 220 },
            { id: 'b12', description: 'Allergy Test', quantity: 1, unitPrice: 250, total: 250 },
        ],
        total: 470,
    }
]

// Helper functions to get data by ID
export const getPatientById = (id: string) => patients.find(p => p.id === id);
export const getVitalsByPatientId = (patientId: string) => vitalSigns.filter(v => v.patientId === patientId);
export const getMedicationsByPatientId = (patientId: string) => medications.filter(m => m.patientId === patientId);
export const getTestReportsByPatientId = (patientId: string) => testReports.filter(r => r.patientId === patientId);
export const getBillingByPatientId = (patientId: string) => billings.find(b => b.patientId === patientId);

export function addPatient(patient: Omit<Patient, 'id' | 'status' | 'admissionDate' | 'dischargeDate' | 'avatarId'>) {
    const newPatient: Patient = {
        ...patient,
        id: (patients.length + 1).toString(),
        avatarId: `avatar-${(patients.length % 5) + 1}`,
        status: 'Admitted',
        admissionDate: new Date().toISOString(),
        dischargeDate: null,
    };
    patients.unshift(newPatient);
    return newPatient;
}
