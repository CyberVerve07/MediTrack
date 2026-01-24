
import type { Meal } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils } from 'lucide-react';
import { format } from 'date-fns';

type MealsTabProps = {
  meals: Meal[];
};

export function MealsTab({ meals }: MealsTabProps) {
  if (meals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Meal Plan</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 gap-4">
            <Utensils className="w-16 h-16 text-muted-foreground/50" />
            <p className="text-muted-foreground">No meal information available for this patient.</p>
        </CardContent>
      </Card>
    );
  }

  // Group meals by date
  const mealsByDate = meals.reduce((acc, meal) => {
    const date = meal.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(mealsByDate).map(([date, dailyMeals]) => (
        <Card key={date} className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
          <CardHeader className="bg-muted/50">
            <CardTitle>{format(new Date(date), 'EEEE, MMMM d, yyyy')}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">
            {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map(mealType => {
              const meal = dailyMeals.find(m => m.type === mealType);
              if (!meal) return (
                <div key={mealType} className="flex flex-col gap-2 rounded-lg border border-dashed p-4 h-full justify-center items-center">
                   <h3 className="font-semibold flex items-center gap-2 text-muted-foreground">
                     <Utensils className="h-4 w-4" /> {mealType}
                  </h3>
                  <p className="text-xs text-muted-foreground">No meal scheduled.</p>
                </div>
              );

              return (
                <div key={mealType} className="flex flex-col gap-3 rounded-lg border p-4 bg-background shadow-sm">
                  <h3 className="font-semibold flex items-center gap-2 text-muted-foreground">
                     <Utensils className="h-4 w-4" /> {mealType}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {meal.items.map(item => (
                      <Badge key={item.id} variant="secondary" className="font-normal text-sm">
                        {item.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
