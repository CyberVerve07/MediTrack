
import { getTodaysMeals, getPatientById } from '@/lib/data';
import type { Meal, Patient } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, VenetianMask } from 'lucide-react';

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
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {patientsWithMeals.map(({ patient, meals }) => {
                        if (!patient) return null;
                        return (
                            <Card key={patient.id} className="group relative overflow-hidden text-primary-foreground shadow-lg transition-transform duration-300 [transform-style:preserve-3d] hover:shadow-2xl hover:[transform:perspective(1000px)_rotateX(2deg)_translateY(-0.25rem)] bg-gradient-to-br from-primary to-accent">
                                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-white/5 to-white/20 opacity-25 transition-all duration-500 group-hover:scale-[1.2] group-hover:-rotate-12" />
                                <CardHeader className="relative">
                                    <CardTitle className="text-xl font-bold">{patient.name}</CardTitle>
                                    <CardDescription className="text-primary-foreground/80">Room: {patient.roomNumber || 'N/A'}</CardDescription>
                                </CardHeader>
                                <CardContent className="relative grid gap-4">
                                    {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map(mealType => {
                                        const meal = meals.find(m => m.type === mealType);
                                        if (!meal) return null;

                                        return (
                                            <div key={mealType} className="flex flex-col gap-2 rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 p-3 backdrop-blur-sm">
                                                <h3 className="font-semibold flex items-center gap-2 text-primary-foreground/80 text-sm">
                                                    <Utensils className="h-4 w-4" /> {mealType}
                                                </h3>
                                                <div className="flex flex-wrap gap-1">
                                                    {meal.items.map(item => (
                                                    <Badge key={item.id} variant="secondary" className="font-normal bg-primary-foreground/90 text-primary hover:bg-primary-foreground">
                                                        {item.name}
                                                    </Badge>
                                                    ))}
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
