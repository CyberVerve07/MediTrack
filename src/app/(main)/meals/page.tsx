
import { getTodaysMeals, getPatientById } from '@/lib/data';
import type { Meal, Patient } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils } from 'lucide-react';

export default function MealsPage() {
    const todaysMeals = getTodaysMeals();
    
    // Group meals by patient ID
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
                    <CardContent className="pt-6">
                        <p className="text-muted-foreground">No meals scheduled for today.</p>
                    </CardContent>
                 </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {patientsWithMeals.map(({ patient, meals }) => {
                        if (!patient) return null;
                        return (
                            <Card key={patient.id}>
                                <CardHeader>
                                    <CardTitle>{patient.name}</CardTitle>
                                    <CardDescription>Room: {patient.roomNumber || 'N/A'}</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map(mealType => {
                                        const meal = meals.find(m => m.type === mealType);
                                        if (!meal) return null;

                                        return (
                                            <div key={mealType} className="flex flex-col gap-2 rounded-lg border p-3">
                                                <h3 className="font-semibold flex items-center gap-2 text-muted-foreground text-sm">
                                                    <Utensils className="h-4 w-4" /> {mealType}
                                                </h3>
                                                <div className="flex flex-wrap gap-1">
                                                    {meal.items.map(item => (
                                                    <Badge key={item.id} variant="secondary" className="font-normal">
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
