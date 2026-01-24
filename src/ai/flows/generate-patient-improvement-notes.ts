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
  prompt: `You are an AI medical assistant designed to track and summarize a patient's health history.
  
  Analyze the complete medical record provided below to generate a concise summary of the patient's health journey. Your summary should highlight key trends, significant medical events, response to treatments, and overall progress. The goal is to provide a clear, structured overview that helps medical staff quickly understand the patient's history and current status.

  If previous AI-generated notes exist, integrate them into your new summary, refining and updating them with the latest information.

  **Patient's Medical Data:**
  - **Patient Details:** {{{patientDetails}}}
  - **Current Health Status:** {{{healthStatus}}}
  - **Timeline of Vital Signs:** {{{vitalSigns}}}
  - **Administered Medications:** {{{medicinesGiven}}}
  - **Diagnostic Test Reports:** {{{testReports}}}
  - **Previous AI Summary:** {{{improvementNotes}}}
  - **Ongoing Treatments:** {{{ongoingTreatments}}}
  
  Generate the updated summary below.
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
