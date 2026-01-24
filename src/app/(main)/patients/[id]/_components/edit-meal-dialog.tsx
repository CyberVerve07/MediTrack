
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import type { Meal, MealItem } from '@/lib/types';
import { updatePatientMeal } from '../actions';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  items: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

type EditMealDialogProps = {
  patientId: string;
  meal: Meal;
  allFoodItems: MealItem[];
  children: React.ReactNode;
};

export function EditMealDialog({
  patientId,
  meal,
  allFoodItems,
  children,
}: EditMealDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: meal.items.map(item => item.id),
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const result = await updatePatientMeal(patientId, meal.id, values.items);

      if (result.success) {
        toast({
          title: 'Meal Updated',
          description: `The ${meal.type} for ${meal.date} has been updated.`,
        });
        setOpen(false);
        router.refresh();
      } else {
        throw new Error(result.error || 'An unknown error occurred');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Failed to Update Meal',
        description: 'An error occurred while updating the meal. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {meal.type}</DialogTitle>
          <DialogDescription>
            Change the food items for this meal on {meal.date}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Menu Items</FormLabel>
                  </div>
                   <ScrollArea className="h-40">
                    <div className="grid grid-cols-2 gap-4">
                        {allFoodItems.map(item => (
                        <FormField
                            key={item.id}
                            control={form.control}
                            name="items"
                            render={({ field }) => {
                            return (
                                <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                <FormControl>
                                    <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={checked => {
                                        return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                                value => value !== item.id
                                            )
                                            );
                                    }}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal">
                                    {item.name}
                                </FormLabel>
                                </FormItem>
                            );
                            }}
                        />
                        ))}
                    </div>
                  </ScrollArea>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
