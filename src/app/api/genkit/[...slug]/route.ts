// This file is required for Genkit to work with Next.js.
// It is a catch-all route that forwards all requests to the Genkit API.
'use server';
import {createNextApiHandler} from '@genkit-ai/next';
import '@/ai/dev';

const handler = createNextApiHandler();

export {handler as GET, handler as POST, handler as PUT, handler as DELETE};
