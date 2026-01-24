
'use client';

import type { Patient, VitalSign } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Activity, Droplets, Thermometer, HeartPulse, LoaderCircle, PlusCircle } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { addVitalSign } from '../actions';
import { Separator } from '@/components/ui/separator';

type VitalsTabProps = {
  patient: Patient;
  vitals: VitalSign[];
};

const chartConfig = {
  heartRate: {
    label: 'Heart Rate',
    color: 'hsl(var(--chart-1))',
  },
  temperature: {
    label: 'Temperature (°F)',
    color: 'hsl(var(--chart-2))',
  },
};

const vitalsFormSchema = z.object({
  bloodPressure: z.string().min(1, 'Blood pressure is required.'),
  heartRate: z.coerce.number().min(1, 'Heart rate is required.'),
  temperature: z.coerce.number().min(1, 'Temperature is required.'),
  bloodSugar: z.string().min(1, 'Blood sugar is required.'),
});

type VitalsFormValues = z.infer<typeof vitalsFormSchema>;

export function VitalsTab({ patient, vitals }: VitalsTabProps) {
  const latestVitals = vitals.length > 0 ? vitals[vitals.length - 1] : null;
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const chartData = vitals
    .slice(-30) // show last 30 readings
    .map(v => ({
      date: format(new Date(v.date), 'M/d'),
      heartRate: v.heartRate,
      temperature: v.temperature,
    }));

  const form = useForm<VitalsFormValues>({
    resolver: zodResolver(vitalsFormSchema),
    defaultValues: {
      bloodPressure: '',
      heartRate: undefined,
      temperature: undefined,
      bloodSugar: '',
    },
  });

  async function onSubmit(values: VitalsFormValues) {
    setIsSubmitting(true);
    try {
      const result = await addVitalSign(patient.id, values);
      if (result.success) {
        toast({
          title: 'Vitals Recorded',
          description: `New vital signs for ${patient.name} have been saved.`,
        });
        form.reset();
        router.refresh();
      } else {
        throw new Error(result.error || 'An unknown error occurred');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Failed to Record Vitals',
        description: 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestVitals?.bloodPressure || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">Latest reading</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <HeartPulse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestVitals?.heartRate || 'N/A'} BPM</div>
            <p className="text-xs text-muted-foreground">Beats per minute</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blood Sugar</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestVitals?.bloodSugar || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">mg/dL</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestVitals?.temperature || 'N/A'} °F</div>
            <p className="text-xs text-muted-foreground">Body temperature</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Vitals Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis yAxisId="left" orientation="left" stroke="var(--color-heartRate)" hide />
                   <YAxis yAxisId="right" orientation="right" stroke="var(--color-temperature)" hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line dataKey="heartRate" type="monotone" stroke="var(--color-heartRate)" strokeWidth={2} dot={false} yAxisId="left" />
                  <Line dataKey="temperature" type="monotone" stroke="var(--color-temperature)" strokeWidth={2} dot={false} yAxisId="right" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Record New Vitals</CardTitle>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="bloodPressure"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Blood Pressure (e.g., 120/80)</FormLabel>
                                <FormControl>
                                    <Input placeholder="120/80" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="heartRate"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Heart Rate (BPM)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="72" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="temperature"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Temperature (°F)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.1" placeholder="98.6" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bloodSugar"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Blood Sugar (mg/dL)</FormLabel>
                                <FormControl>
                                    <Input placeholder="95 mg/dL" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? (
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                             <PlusCircle className="mr-2 h-4 w-4" />
                            )}
                            Save Vitals
                        </Button>
                    </form>
                 </Form>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
