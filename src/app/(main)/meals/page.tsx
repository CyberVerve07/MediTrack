'use client';

import { getTodaysMeals, getPatientById } from '@/lib/data';
import type { Meal, Patient } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils } from 'lucide-react';

const mealGradients = [
  'from-blue-500 to-cyan-400',
  'from-emerald-500 to-green-400',
  'from-purple-500 to-violet-400',
  'from-amber-500 to-yellow-400',
  'from-rose-500 to-red-400',
  'from-sky-500 to-indigo-400',
];

export default function MealsPage() {
    const todaysMeals = getTodaysMeals();
    
    const mealsByPatient = todaysMeals.reduce((acc, meal) => {
        if (!acc[meal.patientId]) {
            acc[meal.patientId] = [];
        }
        acc[meal.patientId].push(meal);
        return acc;
    }, {} as Record<string, Meal[]>);

    const patientsWithMeals = Object.keys(mealsByPatient).map(patientId => {
        const patient = getPatientById(patientId);
        return { patient, meals: mealsByPatient[patientId] };
    }).filter(item => item.patient);


    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold tracking-tight">Daily Meal Schedule</h1>
            <CardDescription>An overview of all meals scheduled for today.</CardDescription>
            {patientsWithMeals.length === 0 ? (
                 <Card>
                    <CardContent className="pt-6 flex flex-col items-center justify-center h-48 gap-4">
                        <Utensils className="w-16 h-16 text-muted-foreground/50" />
                        <p className="text-muted-foreground">No meals scheduled for today.</p>
                    </CardContent>
                 </Card>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {patientsWithMeals.map(({ patient, meals }, index) => {
                        if (!patient) return null;
                        return (
                            <Card key={patient.id} className={`group relative overflow-hidden text-white shadow-lg transition-all duration-300 [transform-style:preserve-3d] hover:shadow-2xl hover:[transform:perspective(1000px)_rotateY(-4deg)_rotateX(8deg)_translateY(-0.5rem)] bg-gradient-to-br ${mealGradients[index % mealGradients.length]}`}>
                                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-white/10 to-white/0 opacity-50 transition-all duration-500 group-hover:scale-[3] group-hover:-rotate-12" />
                                <CardHeader className="relative">
                                    <CardTitle className="text-2xl font-bold">{patient.name}</CardTitle>
                                    <CardDescription className="text-white/80">Room: {patient.roomNumber || 'N/A'}</CardDescription>
                                </CardHeader>
                                <CardContent className="relative grid gap-4">
                                    {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map(mealType => {
                                        const meal = meals.find(m => m.type === mealType);
                                        if (!meal || meal.items.length === 0) return null;

                                        return (
                                            <div key={mealType} className="flex flex-col gap-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                                                <h3 className="font-bold flex items-center gap-2 text-white text-base">
                                                    <Utensils className="h-5 w-5" /> {mealType}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {meal.items.map(item => {
                                                      if (!item) return null;
                                                      return (
                                                        <Badge key={item.id} variant="secondary" className="border-transparent bg-white/20 text-white font-medium hover:bg-white/30">
                                                            {item.name}
                                                        </Badge>
                                                      );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    );
}