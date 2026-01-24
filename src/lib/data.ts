
import { Patient, VitalSign, Medication, TestReport, Billing, Department, Appointment, Meal, MealItem } from './types';
import { subDays, format, addDays, differenceInYears } from 'date-fns';

const today = new Date();

const getWard = (gender: Patient['gender'], dob: string): string => {
    const age = differenceInYears(new Date(), new Date(dob));
    if (age < 18) return 'Pediatrics';
    if (gender === 'Female') return 'Women\'s Ward';
    return 'Men\'s Ward';
}

export let patients: Patient[] = [
  {
    id: '1',
    name: 'Priya Sharma',
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
    roomNumber: '301A',
    ward: getWard('Female', '1985-05-15'),
  },
  {
    id: '2',
    name: 'Rohan Mehra',
    avatarId: 'avatar-2',
    dateOfBirth: '1972-09-20',
    gender: 'Male',
    contact: '555-0102',
    address: '456 Oak Ave, Springfield',
    medicalHistory: ['Diabetes Type 2'],
    admissionDate: subDays(today, 2).toISOString(),
    dischargeDate: null,
    status: 'ICU',
    roomNumber: 'ICU-02',
    ward: 'ICU',
  },
  {
    id: '3',
    name: 'Anjali Gupta',
    avatarId: 'avatar-4',
    dateOfBirth: '1990-02-25',
    gender: 'Female',
    contact: '555-0103',
    address: '789 Pine Ln, Springfield',
    medicalHistory: ['None'],
    admissionDate: subDays(today, 15).toISOString(),
    dischargeDate: subDays(today, 2).toISOString(),
    status: 'Discharged',
    roomNumber: '303C',
    ward: getWard('Female', '1990-02-25'),
  },
  {
    id: '4',
    name: 'Vikram Singh',
    avatarId: 'avatar-5',
    dateOfBirth: '1968-11-30',
    gender: 'Male',
    contact: '555-0104',
    address: '101 Birch Rd, Springfield',
    medicalHistory: ['High Cholesterol'],
    admissionDate: subDays(today, 20).toISOString(),
    dischargeDate: subDays(today, 10).toISOString(),
    status: 'Discharged',
    roomNumber: '304A',
    ward: getWard('Male', '1968-11-30'),
  },
  {
    id: '5',
    name: 'Meera Reddy',
    avatarId: 'avatar-1',
    dateOfBirth: '1992-08-12',
    gender: 'Female',
    contact: '555-0105',
    address: '212 Elm St, Springfield',
    medicalHistory: ['Migraines'],
    admissionDate: subDays(today, 3).toISOString(),
    dischargeDate: null,
    status: 'Admitted',
    roomNumber: '305B',
    ward: getWard('Female', '1992-08-12'),
  },
  {
    id: '6',
    name: 'Arjun Desai',
    avatarId: 'avatar-2',
    dateOfBirth: '1988-07-22',
    gender: 'Male',
    contact: '555-0106',
    address: '333 Cedar Blvd, Springfield',
    medicalHistory: ['Allergies'],
    admissionDate: subDays(today, 1).toISOString(),
    dischargeDate: null,
    status: 'Admitted',
    roomNumber: '306C',
    ward: getWard('Male', '1988-07-22'),
  },
  {
    id: '7',
    name: 'Ishaanvi Patel',
    avatarId: 'avatar-4',
    dateOfBirth: '1983-01-18',
    gender: 'Female',
    contact: '555-0107',
    address: '444 Spruce Way, Springfield',
    medicalHistory: ['Arthritis'],
    admissionDate: subDays(today, 12).toISOString(),
    dischargeDate: subDays(today, 3).toISOString(),
    status: 'Discharged',
    roomNumber: '401A',
    ward: getWard('Female', '1983-01-18'),
  },
  {
    id: '8',
    name: 'Advik Kumar',
    avatarId: 'avatar-5',
    dateOfBirth: '1955-03-10',
    gender: 'Male',
    contact: '555-0108',
    address: '555 Redwood Dr, Springfield',
    medicalHistory: ['Coronary Artery Disease'],
    admissionDate: subDays(today, 8).toISOString(),
    dischargeDate: null,
    status: 'ICU',
    roomNumber: 'ICU-01',
    ward: 'ICU',
  },
   {
    id: '9',
    name: 'Aarav Sharma',
    avatarId: 'avatar-3',
    dateOfBirth: '2018-06-22',
    gender: 'Male',
    contact: '555-0109',
    address: '678 Willow St, Springfield',
    medicalHistory: ['Asthma'],
    admissionDate: subDays(today, 4).toISOString(),
    dischargeDate: null,
    status: 'Admitted',
    roomNumber: 'Ped-01A',
    ward: getWard('Male', '2018-06-22'),
  },
];

export let vitalSigns: VitalSign[] = [
  { id: 'v1', patientId: '1', date: subDays(today, 2).toISOString(), bloodPressure: '120/80', bloodSugar: '95 mg/dL', heartRate: 72, temperature: 98.6 },
  { id: 'v2', patientId: '1', date: subDays(today, 1).toISOString(), bloodPressure: '122/81', bloodSugar: '98 mg/dL', heartRate: 75, temperature: 98.7 },
  { id: 'v3', patientId: '2', date: subDays(today, 2).toISOString(), bloodPressure: '140/90', bloodSugar: '180 mg/dL', heartRate: 95, temperature: 99.5 },
  { id: 'v4', patientId: '2', date: subDays(today, 1).toISOString(), bloodPressure: '135/88', bloodSugar: '160 mg/dL', heartRate: 90, temperature: 99.1 },
  { id: 'v5', patientId: '3', date: subDays(today, 5).toISOString(), bloodPressure: '110/70', bloodSugar: '85 mg/dL', heartRate: 65, temperature: 98.4 },
  { id: 'v6', patientId: '5', date: subDays(today, 1).toISOString(), bloodPressure: '115/75', bloodSugar: '90 mg/dL', heartRate: 70, temperature: 98.5 },
  { id: 'v7', patientId: '6', date: subDays(today, 1).toISOString(), bloodPressure: '125/82', bloodSugar: '105 mg/dL', heartRate: 77, temperature: 98.8 },
  { id: 'v8', patientId: '8', date: subDays(today, 1).toISOString(), bloodPressure: '150/95', bloodSugar: '120 mg/dL', heartRate: 102, temperature: 99.8 },
  { id: 'v9', patientId: '9', date: subDays(today, 1).toISOString(), bloodPressure: '100/65', bloodSugar: 'N/A', heartRate: 95, temperature: 99.0 },
];

export const medications: Medication[] = [
  { id: 'm1', patientId: '1', name: 'Lisinopril', dosage: '10mg', time: '09:00 AM', date: format(subDays(today, 1), 'yyyy-MM-dd') },
  { id: 'm2', patientId: '1', name: 'Albuterol', dosage: '2 puffs', time: '10:00 AM', date: format(subDays(today, 1), 'yyyy-MM-dd') },
  { id: 'm3', patientId: '2', name: 'Metformin', dosage: '1000mg', time: '08:00 AM', date: format(subDays(today, 1), 'yyyy-MM-dd') },
  { id: 'm4', patientId: '2', name: 'Norepinephrine', dosage: 'IV Drip', time: 'Continuous', date: format(subDays(today, 1), 'yyyy-MM-dd') },
  { id: 'm5', patientId: '5', name: 'Sumatriptan', dosage: '50mg', time: 'as needed', date: format(subDays(today, 2), 'yyyy-MM-dd') },
  { id: 'm6', patientId: '6', name: 'Loratadine', dosage: '10mg', time: '09:00 AM', date: format(subDays(today, 1), 'yyyy-MM-dd') },
  { id: 'm7', patientId: '8', name: 'Aspirin', dosage: '81mg', time: '09:00 AM', date: format(subDays(today, 1), 'yyyy-MM-dd') },
  { id: 'm8', patientId: '8', name: 'Propofol', dosage: 'IV Drip', time: 'Continuous', date: format(subDays(today, 1), 'yyyy-MM-dd') },
  { id: 'm9', patientId: '9', name: 'Amoxicillin', dosage: '250mg', time: '08:00 AM', date: format(subDays(today, 1), 'yyyy-MM-dd') },
];

export const testReports: TestReport[] = [
  { id: 'tr1', patientId: '1', name: 'Complete Blood Count', category: 'Blood Test', date: subDays(today, 9).toISOString(), url: '#' },
  { id: 'tr2', patientId: '1', name: 'Chest X-Ray', category: 'X-Ray', date: subDays(today, 8).toISOString(), url: '#' },
  { id: 'tr3', patientId: '2', name: 'Arterial Blood Gas', category: 'Blood Test', date: subDays(today, 1).toISOString(), url: '#' },
  { id: 'tr4', patientId: '8', name: 'Echocardiogram', category: 'X-Ray', date: subDays(today, 7).toISOString(), url: '#' },
  { id: 'tr5', patientId: '2', name: 'Portable Chest X-Ray', category: 'X-Ray', date: subDays(today, 1).toISOString(), url: '#' },
  { id: 'tr6', patientId: '9', name: 'RSV Test', category: 'Blood Test', date: subDays(today, 3).toISOString(), url: '#' },
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
            { id: 'b4', description: 'ICU Charge', quantity: 2, unitPrice: 1500, total: 3000 },
            { id: 'b5', description: 'Metformin', quantity: 2, unitPrice: 4, total: 8 },
            { id: 'b6', description: 'Arterial Blood Gas', quantity: 1, unitPrice: 120, total: 120 },
        ],
        total: 3128,
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
    },
    {
        patientId: '8',
        items: [
            { id: 'b13', description: 'ICU Charge', quantity: 8, unitPrice: 1500, total: 12000 },
            { id: 'b14', description: 'Echocardiogram', quantity: 1, unitPrice: 500, total: 500 },
        ],
        total: 12500,
    },
];

export let departments: Department[] = [
    {
        id: 'cardio',
        name: 'Cardiology',
        head: 'Dr. Evelyn Reed',
        location: 'Wing A, Floor 2',
        description: 'Specializes in heart-related conditions, from congenital heart defects to coronary artery disease.',
        opdSchedule: 'Mon, Wed, Fri (9 AM - 1 PM)',
        operationDays: 'Tuesday & Thursday',
        contact: '555-1101',
        doctors: [
            { id: 'doc1', name: 'Dr. Evelyn Reed', specialty: 'Interventional Cardiology', availability: ['Mon', 'Wed', 'Fri'], opdDays: ['Mon', 'Wed'], opdHours: '9 AM - 11 AM' },
            { id: 'doc2', name: 'Dr. Samuel Jones', specialty: 'Electrophysiology', availability: ['Tue', 'Thu'], opdDays: ['Fri'], opdHours: '10 AM - 1 PM' },
        ]
    },
    {
        id: 'neuro',
        name: 'Neurology',
        head: 'Dr. Arthur Crane',
        location: 'Wing B, Floor 1',
        description: 'Focuses on disorders of the nervous system, including the brain, spinal cord, and nerves.',
        opdSchedule: 'Tue, Thu (10 AM - 2 PM)',
        operationDays: 'Monday',
        contact: '555-1102',
        doctors: [
            { id: 'doc3', name: 'Dr. Arthur Crane', specialty: 'Neuro-oncology', availability: ['Tue', 'Thu'], opdDays: ['Tue', 'Thu'], opdHours: '10 AM - 12 PM' },
            { id: 'doc4', name: 'Dr. Isabella Cortez', specialty: 'Pediatric Neurology', availability: ['Mon', 'Wed'], opdDays: ['Tue', 'Thu'], opdHours: '12 PM - 2 PM' },
        ]
    },
    {
        id: 'ortho',
        name: 'Orthopedics',
        head: 'Dr. Marcus Thorne',
        location: 'Wing C, Floor 3',
        description: 'Deals with injuries and diseases of your body\'s musculoskeletal system.',
        opdSchedule: 'Mon, Fri (8 AM - 12 PM)',
        operationDays: 'Wednesday',
        contact: '555-1103',
        doctors: [
            { id: 'doc5', name: 'Dr. Marcus Thorne', specialty: 'Sports Medicine', availability: ['Mon', 'Fri'], opdDays: ['Mon', 'Fri'], opdHours: '8 AM - 10 AM' },
            { id: 'doc6', name: 'Dr. Lena Petrova', specialty: 'Spine Surgery', availability: ['Wed', 'Thu'], opdDays: ['Mon', 'Fri'], opdHours: '10 AM - 12 PM' },
        ]
    },
    {
        id: 'radio',
        name: 'Radiology',
        head: 'Dr. Helen Cho',
        location: 'Wing A, Ground Floor',
        description: 'Uses medical imaging to diagnose and treat diseases seen within the body.',
        opdSchedule: 'Daily (9 AM - 5 PM)',
        operationDays: 'N/A (Interventional procedures as scheduled)',
        contact: '555-1104',
        doctors: [
            { id: 'doc7', name: 'Dr. Helen Cho', specialty: 'Diagnostic Radiology', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], opdDays: [], opdHours: '' },
            { id: 'doc8', name: 'Dr. Ben Carter', specialty: 'Interventional Radiology', availability: ['Mon', 'Wed', 'Fri'], opdDays: [], opdHours: '' },
        ]
    },
     {
        id: 'onco',
        name: 'Oncology',
        head: 'Dr. Kenji Tanaka',
        location: 'Wing D, Floor 2',
        description: 'Dedicated to the diagnosis and treatment of cancer.',
        opdSchedule: 'Mon, Wed, Fri (10 AM - 4 PM)',
        operationDays: 'N/A (Chemotherapy/Radiation as per plan)',
        contact: '555-1105',
        doctors: [
            { id: 'doc9', name: 'Dr. Kenji Tanaka', specialty: 'Medical Oncology', availability: ['Mon', 'Wed'], opdDays: ['Mon', 'Wed'], opdHours: '10 AM - 1 PM' },
            { id: 'doc10', name: 'Dr. Sofia Rossi', specialty: 'Radiation Oncology', availability: ['Tue', 'Thu', 'Fri'], opdDays: ['Fri'], opdHours: '11 AM - 2 PM' },
        ]
    },
    {
        id: 'pedia',
        name: 'Pediatrics',
        head: 'Dr. Clara Oswald',
        location: 'Wing C, Floor 1',
        description: 'Provides medical care for infants, children, and adolescents.',
        opdSchedule: 'Daily (9 AM - 5 PM)',
        operationDays: 'N/A',
        contact: '555-1106',
        doctors: [
            { id: 'doc11', name: 'Dr. Clara Oswald', specialty: 'General Pediatrics', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], opdDays: ['Mon', 'Wed', 'Fri'], opdHours: '9 AM - 12 PM' },
            { id: 'doc12', name: 'Dr. Ryan Sinclair', specialty: 'Pediatric Pulmonology', availability: ['Tue', 'Thu'], opdDays: ['Tue', 'Thu'], opdHours: '1 PM - 4 PM' },
        ]
    },
    {
        id: 'obgyn',
        name: 'Obstetrics & Gynecology',
        head: 'Dr. Martha Jones',
        location: 'Wing B, Floor 2',
        description: 'Comprehensive care for women, including pregnancy, childbirth, and reproductive health.',
        opdSchedule: 'Mon, Tue, Thu (8 AM - 3 PM)',
        operationDays: 'Wednesday',
        contact: '555-1107',
        doctors: [
            { id: 'doc13', name: 'Dr. Martha Jones', specialty: 'Obstetrics', availability: ['Mon', 'Tue', 'Thu'], opdDays: ['Mon', 'Thu'], opdHours: '8 AM - 12 PM' },
            { id: 'doc14', name: 'Dr. Donna Noble', specialty: 'Gynecologic Oncology', availability: ['Tue', 'Wed'], opdDays: ['Tue'], opdHours: '1 PM - 4 PM' },
        ]
    },
];

export let appointments: Appointment[] = [
    { id: 'apt1', patientName: 'Meera Reddy', doctorName: 'Dr. Evelyn Reed', department: 'Cardiology', date: format(addDays(today, 2), 'yyyy-MM-dd'), time: '10:00 AM', status: 'Scheduled' },
    { id: 'apt2', patientName: 'Rohan Mehra', doctorName: 'Dr. Samuel Jones', department: 'Cardiology', date: format(addDays(today, 2), 'yyyy-MM-dd'), time: '11:00 AM', status: 'Scheduled' },
    { id: 'apt3', patientName: 'New Patient', doctorName: 'Dr. Arthur Crane', department: 'Neurology', date: format(addDays(today, 3), 'yyyy-MM-dd'), time: '11:30 AM', status: 'Scheduled' },
    { id: 'apt4', patientName: 'Former Patient', doctorName: 'Dr. Marcus Thorne', department: 'Orthopedics', date: format(subDays(today, 1), 'yyyy-MM-dd'), time: '09:00 AM', status: 'Completed' },
     { id: 'apt5', patientName: 'Guest User', doctorName: 'Dr. Sofia Rossi', department: 'Oncology', date: format(addDays(today, 1), 'yyyy-MM-dd'), time: '01:00 PM', status: 'Canceled' },
];


export const foodItems: MealItem[] = [
  { id: 'f1', name: 'Milk' },
  { id: 'f2', name: 'Rice' },
  { id: 'f3', name: 'Eggs' },
  { id: 'f4', name: 'Bread' },
  { id: 'f5', name: 'Moong Dal' },
  { id: 'f6', name: 'Soji' },
  { id: 'f7', name: 'Daliya' },
  { id: 'f8', name: 'Tea' },
  { id: 'f9', name: 'Coffee' },
  { id: 'f10', name: 'Curd' },
  { id: 'f11', name: 'Salad' },
  { id: 'f12', name: 'Apple' },
  { id: 'f13', name: 'Banana' },
  { id: 'f14', name: 'Vegetable Soup' },
];

export let meals: Meal[] = [
  // Patient 1 (Priya Sharma)
  { id: 'ml1', patientId: '1', date: format(subDays(today, 2), 'yyyy-MM-dd'), type: 'Breakfast', items: [foodItems[5], foodItems[0]] },
  { id: 'ml2', patientId: '1', date: format(subDays(today, 2), 'yyyy-MM-dd'), type: 'Lunch', items: [foodItems[1], foodItems[4], foodItems[10]] },
  { id: 'ml3', patientId: '1', date: format(subDays(today, 1), 'yyyy-MM-dd'), type: 'Breakfast', items: [foodItems[3], foodItems[0], foodItems[12]] },
  { id: 'ml4', patientId: '1', date: format(subDays(today, 1), 'yyyy-MM-dd'), type: 'Lunch', items: [foodItems[1], foodItems[4], foodItems[10], foodItems[11]] },
  { id: 'ml5', patientId: '1', date: format(subDays(today, 1), 'yyyy-MM-dd'), type: 'Snacks', items: [foodItems[7], foodItems[13]] },
  { id: 'ml6', patientId: '1', date: format(subDays(today, 1), 'yyyy-MM-dd'), type: 'Dinner', items: [foodItems[6], foodItems[13]] },
  { id: 'ml7', patientId: '1', date: format(today, 'yyyy-MM-dd'), type: 'Breakfast', items: [foodItems[5], foodItems[3]] },
  { id: 'ml8', patientId: '1', date: format(today, 'yyyy-MM-dd'), type: 'Lunch', items: [foodItems[1], foodItems[4], foodItems[10]] },
  
  // Patient 2 (Rohan Mehra) - ICU
  { id: 'ml9', patientId: '2', date: format(subDays(today, 1), 'yyyy-MM-dd'), type: 'Breakfast', items: [foodItems[6]] },
  { id: 'ml10', patientId: '2', date: format(subDays(today, 1), 'yyyy-MM-dd'), type: 'Lunch', items: [foodItems[13], foodItems[4]] },
  { id: 'ml11', patientId: '2', date: format(subDays(today, 1), 'yyyy-MM-dd'), type: 'Dinner', items: [foodItems[5]] },
  { id: 'ml12', patientId: '2', date: format(today, 'yyyy-MM-dd'), type: 'Breakfast', items: [foodItems[13]] },
  { id: 'ml13', patientId: '2', date: format(today, 'yyyy-MM-dd'), type: 'Lunch', items: [foodItems[6]] },


  // Patient 5 (Meera Reddy)
  { id: 'ml14', patientId: '5', date: format(subDays(today, 2), 'yyyy-MM-dd'), type: 'Breakfast', items: [foodItems[3], foodItems[2]] },
  { id: 'ml15', patientId: '5', date: format(subDays(today, 2), 'yyyy-MM-dd'), type: 'Lunch', items: [foodItems[1], foodItems[4], foodItems[11]] },
  { id: 'ml16', patientId: '5', date: format(subDays(today, 1), 'yyyy-MM-dd'), type: 'Breakfast', items: [foodItems[0], foodItems[12]] },
  { id: 'ml17', patientId: '5', date: format(subDays(today, 1), 'yyyy-MM-dd'), type: 'Lunch', items: [foodItems[1], foodItems[4], foodItems[10]] },
  { id: 'ml18', patientId: '5', date: format(today, 'yyyy-MM-dd'), type: 'Breakfast', items: [foodItems[3], foodItems[8]] },
  { id: 'ml19', patientId: '5', date: format(today, 'yyyy-MM-dd'), type: 'Lunch', items: [foodItems[1], foodItems[4], foodItems[11], foodItems[10]] },
  { id: 'ml20', patientId: '5', date: format(today, 'yyyy-MM-dd'), type: 'Dinner', items: [foodItems[6], foodItems[13]] },

  // Patient 6 (Arjun Desai)
  { id: 'ml21', patientId: '6', date: format(today, 'yyyy-MM-dd'), type: 'Breakfast', items: [foodItems[3], foodItems[0]] },
  { id: 'ml22', patientId: '6', date: format(today, 'yyyy-MM-dd'), type: 'Lunch', items: [foodItems[1], foodItems[4]] },
  
  // Patient 9 (Aarav Sharma) - Pediatrics
  { id: 'ml23', patientId: '9', date: format(today, 'yyyy-MM-dd'), type: 'Breakfast', items: [foodItems[0], foodItems[12]] },
  { id: 'ml24', patientId: '9', date: format(today, 'yyyy-MM-dd'), type: 'Lunch', items: [foodItems[6], foodItems[10]] },
  { id: 'ml25', patientId: '9', date: format(today, 'yyyy-MM-dd'), type: 'Dinner', items: [foodItems[1], foodItems[4]] },
];


// Helper functions to get data by ID
export const getPatientById = (id: string) => patients.find(p => p.id === id);
export const getVitalsByPatientId = (patientId: string) => vitalSigns.filter(v => v.patientId === patientId).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
export const getMedicationsByPatientId = (patientId: string) => medications.filter(m => m.patientId === patientId);
export const getTestReportsByPatientId = (patientId: string) => testReports.filter(r => r.patientId === patientId);
export const getBillingByPatientId = (patientId: string) => billings.find(b => b.patientId === patientId);
export const getDepartments = () => departments;
export const getAppointments = () => appointments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
export const getAllDoctors = () => departments.flatMap(d => d.doctors.map(doc => ({ ...doc, department: d.name })));
export const getTodaysMeals = () => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    return meals.filter(m => m.date === todayStr);
}
export const getMealsByPatientId = (patientId: string) => meals.filter(m => m.patientId === patientId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


export function addPatient(patient: Omit<Patient, 'id' | 'status' | 'admissionDate' | 'dischargeDate' | 'avatarId' | 'ward'>) {
    const newPatient: Patient = {
        ...patient,
        id: (patients.length + 1).toString(),
        avatarId: `avatar-${(patients.length % 5) + 1}`,
        status: 'Admitted',
        admissionDate: new Date().toISOString(),
        dischargeDate: null,
        ward: getWard(patient.gender, patient.dateOfBirth),
    };
    patients.unshift(newPatient);
    return newPatient;
}

export function editPatient(patientId: string, patientData: Omit<Patient, 'id' | 'status' | 'admissionDate' | 'dischargeDate' | 'avatarId' | 'ward'>) {
    const patientIndex = patients.findIndex(p => p.id === patientId);
    if (patientIndex > -1) {
        const existingPatient = patients[patientIndex];
        patients[patientIndex] = {
            ...existingPatient,
            ...patientData,
            ward: getWard(patientData.gender, patientData.dateOfBirth),
        };
        return patients[patientIndex];
    }
    return null;
}

export function dischargePatient(patientId: string) {
    const patientIndex = patients.findIndex(p => p.id === patientId);
    if (patientIndex > -1) {
        patients[patientIndex].status = 'Discharged';
        patients[patientIndex].dischargeDate = new Date().toISOString();
        return patients[patientIndex];
    }
    return null;
}

export function addVitalSign(patientId: string, vitalData: Omit<VitalSign, 'id' | 'patientId' | 'date'>) {
    const newVital: VitalSign = {
        ...vitalData,
        id: `v${vitalSigns.length + 1}`,
        patientId: patientId,
        date: new Date().toISOString(),
    };
    vitalSigns.push(newVital);
    return newVital;
}

export function addAppointment(appointment: Omit<Appointment, 'id' | 'status'>) {
    const newAppointment: Appointment = {
        ...appointment,
        id: `apt${appointments.length + 1}`,
        status: 'Scheduled',
    };
    appointments.unshift(newAppointment);
    return newAppointment;
}
