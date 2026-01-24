
import { foodItems } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils } from 'lucide-react';

export function MenuItemsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Menu Items</CardTitle>
        <CardDescription>
          This is a list of all food items that can be assigned to a patient's meal plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {foodItems.map(item => (
          <Badge key={item.id} variant="outline" className="text-base px-4 py-1">
            <Utensils className="mr-2 h-4 w-4" />
            {item.name}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
