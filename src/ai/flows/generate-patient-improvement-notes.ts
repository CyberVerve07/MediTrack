'use server';

/**
 * @fileOverview Generates patient improvement notes using AI.
 *
 * - generatePatientImprovementNotes - A function that generates patient improvement notes.
 * - GeneratePatientImprovementNotesInput - The input type for the generatePatientImprovementNotes function.
 * - GeneratePatientImprovementNotesOutput - The return type for the generatePatientImprovementNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePatientImprovementNotesInputSchema = z.object({
  patientDetails: z
    .string()
    .describe('Comprehensive details of the patient, including medical history.'),
  healthStatus: z.string().describe('Current health status of the patient.'),
  vitalSigns: z
    .string()
    .describe(
      'Vital signs of the patient including BP, sugar, and blood levels.'
    ),
  ongoingTreatments: z.string().describe('Ongoing treatments for the patient.'),
  medicinesGiven: z.string().describe('Medicines administered to the patient.'),
  improvementNotes: z.string().optional().describe('Previous improvement notes for the patient.'),
  testReports: z.string().optional().describe('Test reports for the patient.'),
});

export type GeneratePatientImprovementNotesInput = z.infer<
  typeof GeneratePatientImprovementNotesInputSchema
>;

const GeneratePatientImprovementNotesOutputSchema = z.object({
  improvementNotes: z
    .string()
    .describe('AI-generated improvement notes for the patient.'),
});

export type GeneratePatientImprovementNotesOutput = z.infer<
  typeof GeneratePatientImprovementNotesOutputSchema
>;

export async function generatePatientImprovementNotes(
  input: GeneratePatientImprovementNotesInput
): Promise<GeneratePatientImprovementNotesOutput> {
  return generatePatientImprovementNotesFlow(input);
}

const generatePatientImprovementNotesPrompt = ai.definePrompt({
  name: 'generatePatientImprovementNotesPrompt',
  input: {schema: GeneratePatientImprovementNotesInputSchema},
  output: {schema: GeneratePatientImprovementNotesOutputSchema},
  prompt: `You are an AI assistant specialized in generating improvement notes for patients based on their medical data.

  Given the following patient information, generate concise and informative improvement notes that can assist nurses in providing targeted care.

  Patient Details: {{{patientDetails}}}
  Health Status: {{{healthStatus}}}
  Vital Signs: {{{vitalSigns}}}
  Ongoing Treatments: {{{ongoingTreatments}}}
  Medicines Given: {{{medicinesGiven}}}
  Previous Improvement Notes: {{{improvementNotes}}}
  Test Reports: {{{testReports}}}

  Please provide improvement notes that are clear, relevant, and actionable.
  `,
});

const generatePatientImprovementNotesFlow = ai.defineFlow(
  {
    name: 'generatePatientImprovementNotesFlow',
    inputSchema: GeneratePatientImprovementNotesInputSchema,
    outputSchema: GeneratePatientImprovementNotesOutputSchema,
  },
  async input => {
    const {output} = await generatePatientImprovementNotesPrompt(input);
    return output!;
  }
);
