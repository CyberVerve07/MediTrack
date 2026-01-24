
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Utensils, ClipboardList } from 'lucide-react';
import { TodaysMealsTab } from './_components/todays-meals-tab';
import { MenuItemsTab } from './_components/menu-items-tab';

export default function MealsPage() {
  const tabs = [
    { value: 'todays-meals', label: 'Today\'s Meals', icon: Utensils, component: <TodaysMealsTab /> },
    { value: 'menu-items', label: 'Menu Items', icon: ClipboardList, component: <MenuItemsTab /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Meal Management</h1>
      <Tabs defaultValue="todays-meals">
        <TabsList className="grid w-full grid-cols-2">
          {tabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
