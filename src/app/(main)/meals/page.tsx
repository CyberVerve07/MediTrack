
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Utensils, 
  ClipboardList, 
  Search, 
  Filter, 
  Plus,
  Clock,
  Calendar,
  User,
  Bed,
  ChevronRight,
  Coffee,
  Sun,
  Moon,
  Apple
} from 'lucide-react';
import { getTodaysMeals, getPatientById, foodItems } from '@/lib/data';
import type { Meal, Patient } from '@/lib/types';
import { useEffect, useState as useStateReact } from 'react';

// Food category images
const foodImages: Record<string, string> = {
  'Breakfast': 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=300&fit=crop',
  'Lunch': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  'Snacks': 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=300&fit=crop',
  'Dinner': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  'default': 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=300&fit=crop'
};

// Patient images
const patientImages: Record<string, string> = {
  'default': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face'
};

export default function MealsPage() {
  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6 border-b border-border/50">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Meal Management
          </h1>
          <p className="text-muted-foreground mt-1 text-base">
            Manage patient meal plans and nutrition schedules
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="pl-9 pr-4 py-2 text-sm border border-border/50 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64 transition-all"
            />
          </div>
          <Button variant="outline" className="border-border/50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Meal
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/50 shadow-medical hover:shadow-medical-hover transition-all">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <Coffee className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Breakfast</p>
              <p className="text-2xl font-bold text-foreground">24</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-medical hover:shadow-medical-hover transition-all">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Sun className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lunch</p>
              <p className="text-2xl font-bold text-foreground">28</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-medical hover:shadow-medical-hover transition-all">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 bg-yellow-50 rounded-xl flex items-center justify-center">
              <Apple className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Snacks</p>
              <p className="text-2xl font-bold text-foreground">15</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-medical hover:shadow-medical-hover transition-all">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Moon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dinner</p>
              <p className="text-2xl font-bold text-foreground">22</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todays-meals" className="space-y-6">
        <TabsList className="bg-secondary/50 p-1 border-border/50">
          <TabsTrigger 
            value="todays-meals" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2"
          >
            <Utensils className="h-4 w-4" />
            Today's Meals
          </TabsTrigger>
          <TabsTrigger 
            value="menu-items"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2"
          >
            <ClipboardList className="h-4 w-4" />
            Menu Items
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todays-meals" className="space-y-4">
          <TodaysMealsProfessional />
        </TabsContent>

        <TabsContent value="menu-items" className="space-y-4">
          <MenuItemsProfessional />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TodaysMealsProfessional() {
  const [patientsWithMeals, setPatientsWithMeals] = useStateReact<{ patient: Patient; meals: Meal[] }[] | null>(null);

  useEffect(() => {
    const todaysMealsData = getTodaysMeals();
    
    const mealsByPatient = todaysMealsData.reduce((acc, meal) => {
      if (!acc[meal.patientId]) {
        acc[meal.patientId] = [];
      }
      acc[meal.patientId].push(meal);
      return acc;
    }, {} as Record<string, Meal[]>);

    const patientsData = Object.keys(mealsByPatient).map(patientId => {
      const patient = getPatientById(patientId);
      return { patient, meals: mealsByPatient[patientId] };
    }).filter((item): item is { patient: Patient; meals: Meal[] } => item.patient !== undefined);

    setPatientsWithMeals(patientsData);
  }, []);

  if (patientsWithMeals === null) {
    return (
      <Card className="border-border/50 shadow-medical">
        <CardContent className="pt-6 flex flex-col items-center justify-center h-48 gap-4">
          <Utensils className="w-16 h-16 text-muted-foreground/30" />
          <p className="text-muted-foreground">Loading today's meals...</p>
        </CardContent>
      </Card>
    );
  }

  if (patientsWithMeals.length === 0) {
    return (
      <Card className="border-border/50 shadow-medical">
        <CardContent className="pt-6 flex flex-col items-center justify-center h-48 gap-4">
          <Utensils className="w-16 h-16 text-muted-foreground/30" />
          <p className="text-muted-foreground">No meals scheduled for today.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {patientsWithMeals.map(({ patient, meals }, index) => (
        <Card 
          key={patient.id} 
          className="overflow-hidden border-border/50 shadow-medical hover:shadow-medical-hover transition-all duration-300 hover:-translate-y-1"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Patient Header */}
          <div className="p-5 border-b border-border/50">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14 border-2 border-white shadow-medical">
                <AvatarImage src={patientImages['default']} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    Room {patient.roomNumber || 'N/A'}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {patient.gender}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-5">
            <div className="space-y-3">
              {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map(mealType => {
                const meal = meals.find(m => m.type === mealType);
                if (!meal || meal.items.length === 0) return null;

                const mealImage = foodImages[mealType] || foodImages['default'];

                return (
                  <div 
                    key={mealType} 
                    className="flex items-center gap-4 p-3 bg-secondary/30 rounded-xl border border-border/30 hover:border-primary/20 transition-all"
                  >
                    {/* Meal Image */}
                    <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={mealImage} 
                        alt={mealType}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meal Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{mealType}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            mealType === 'Breakfast' ? 'border-orange-200 text-orange-700 bg-orange-50' :
                            mealType === 'Lunch' ? 'border-green-200 text-green-700 bg-green-50' :
                            mealType === 'Snacks' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                            'border-blue-200 text-blue-700 bg-blue-50'
                          }`}
                        >
                          {mealType === 'Breakfast' && <Coffee className="h-3 w-3 mr-1" />}
                          {mealType === 'Lunch' && <Sun className="h-3 w-3 mr-1" />}
                          {mealType === 'Snacks' && <Apple className="h-3 w-3 mr-1" />}
                          {mealType === 'Dinner' && <Moon className="h-3 w-3 mr-1" />}
                          {meal.scheduledTime}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {meal.items.slice(0, 3).map(item => (
                          <span key={item.id} className="text-sm text-muted-foreground">
                            {item.name}
                          </span>
                        ))}
                        {meal.items.length > 3 && (
                          <span className="text-sm text-muted-foreground">
                            +{meal.items.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Dietary Info */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/30">
              <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700 bg-emerald-50">
                Vegetarian
              </Badge>
              <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
                Low Sodium
              </Badge>
              <span className="text-xs text-muted-foreground ml-auto">
                Calories: 1,850 kcal
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function MenuItemsProfessional() {
  const categories = [
    { name: 'Breakfast Items', icon: Coffee, color: 'orange', items: foodItems.filter((_, i) => i < 8) },
    { name: 'Lunch & Dinner', icon: Sun, color: 'green', items: foodItems.filter((_, i) => i >= 8 && i < 16) },
    { name: 'Snacks & Sides', icon: Apple, color: 'yellow', items: foodItems.filter((_, i) => i >= 16) },
  ];

  return (
    <div className="space-y-6">
      {categories.map((category, index) => (
        <Card key={index} className="border-border/50 shadow-medical">
          <CardHeader className="border-b border-border/30 pb-4">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 bg-${category.color}-50 rounded-xl flex items-center justify-center`}>
                <category.icon className={`h-5 w-5 text-${category.color}-600`} />
              </div>
              <div>
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <CardDescription>{category.items.length} items available</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex flex-wrap gap-2">
              {category.items.map(item => (
                <Badge 
                  key={item.id} 
                  variant="outline" 
                  className="px-3 py-1.5 text-sm border-border/50 hover:border-primary/30 hover:bg-secondary/50 transition-all cursor-pointer"
                >
                  <Utensils className="mr-2 h-3 w-3" />
                  {item.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
