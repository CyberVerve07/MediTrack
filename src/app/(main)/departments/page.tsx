'use client';

import { useState } from 'react';
import { getDepartments } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  Phone, 
  MapPin, 
  Stethoscope,
  Clock,
  ChevronRight,
  Search,
  Filter,
  MoreHorizontal,
  Bed,
  Activity,
  Calendar
} from 'lucide-react';
import type { Department } from '@/lib/types';

// Department images - using professional medical imagery
const departmentImages: Record<string, string> = {
  'Cardiology': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop',
  'Neurology': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=400&fit=crop',
  'Orthopedics': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=400&fit=crop',
  'Pediatrics': 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&h=400&fit=crop',
  'Oncology': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=400&fit=crop',
  'Emergency': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop',
  'Radiology': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=400&fit=crop',
  'default': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop'
};

// Doctor profile images
const doctorImages: Record<string, string> = {
  'Dr. Sarah Johnson': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
  'Dr. Michael Chen': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
  'Dr. Emily Davis': 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face',
  'Dr. James Wilson': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face',
  'Dr. Lisa Anderson': 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face',
  'Dr. Robert Taylor': 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face',
  'default': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face'
};

export default function DepartmentsPage() {
  const departments = getDepartments();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6 border-b border-border/50">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Hospital Departments
          </h1>
          <p className="text-muted-foreground mt-1 text-base">
            Explore our specialized medical departments and expert healthcare team
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search departments..." 
              className="pl-9 pr-4 py-2 text-sm border border-border/50 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64 transition-all"
            />
          </div>
          <Button variant="outline" className="border-border/50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {departments.map((dept, index) => (
          <DepartmentCard
            key={dept.id}
            department={dept}
            index={index}
            onClick={() => setSelectedDepartment(dept)}
          />
        ))}
      </div>

      {/* Department Detail Modal */}
      {selectedDepartment && (
        <DepartmentDetailModal 
          department={selectedDepartment} 
          onClose={() => setSelectedDepartment(null)}
        />
      )}
    </div>
  );
}

function DepartmentCard({ department, index, onClick }: { department: Department, index: number, onClick: () => void }) {
  const imageUrl = departmentImages[department.name] || departmentImages['default'];
  
  return (
    <Card 
      className="overflow-hidden border-border/50 shadow-medical hover:shadow-medical-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Department Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={department.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
              {department.doctors.length} Doctors
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-white">{department.name}</h3>
        </div>
      </div>

      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {department.description}
        </p>

        {/* Quick Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Head:</span>
            <span className="font-medium text-foreground">{department.head}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium text-foreground">{department.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Contact:</span>
            <span className="font-medium text-foreground">{department.contact}</span>
          </div>
        </div>

        {/* Doctor Preview */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex -space-x-2">
            {department.doctors.slice(0, 3).map((doctor, idx) => (
              <Avatar key={doctor.id} className="h-8 w-8 border-2 border-white">
                <AvatarImage src={doctorImages[doctor.name] || doctorImages['default']} />
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {doctor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {department.doctors.length > 3 && (
              <div className="h-8 w-8 rounded-full bg-secondary border-2 border-white flex items-center justify-center text-xs font-medium text-muted-foreground">
                +{department.doctors.length - 3}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DepartmentDetailModal({ department, onClose }: { department: Department, onClose: () => void }) {
  const imageUrl = departmentImages[department.name] || departmentImages['default'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <Card 
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-medical-elevated"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64">
          <img 
            src={imageUrl} 
            alt={department.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-sm">
                {department.doctors.length} Specialist Doctors
              </Badge>
            </div>
            <h2 className="text-3xl font-bold text-white">{department.name}</h2>
            <p className="text-white/80 mt-2 max-w-2xl">{department.description}</p>
          </div>
        </div>

        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-secondary/50 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="doctors" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Doctors ({department.doctors.length})
              </TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Services
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Department Info Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-border/50">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Department Head</p>
                      <p className="font-semibold text-foreground">{department.head}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold text-foreground">{department.location}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-semibold text-foreground">{department.contact}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Stats */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 bg-secondary/30 rounded-xl">
                  <Bed className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-sm text-muted-foreground">Beds Available</p>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-xl">
                  <Activity className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">98%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-xl">
                  <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">Mon-Sat</p>
                  <p className="text-sm text-muted-foreground">Working Days</p>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-xl">
                  <Clock className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">24/7</p>
                  <p className="text-sm text-muted-foreground">Emergency</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="doctors" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {department.doctors.map((doctor) => (
                  <Card key={doctor.id} className="border-border/50 hover:border-primary/30 hover:shadow-medical-hover transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border-2 border-white shadow-medical">
                          <AvatarImage src={doctorImages[doctor.name] || doctorImages['default']} />
                          <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-lg">{doctor.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Stethoscope className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{doctor.specialty}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {doctor.opdDays.join(', ')} | {doctor.opdHours}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Badge variant="outline" className="text-xs">15+ Years Exp</Badge>
                            <Badge variant="outline" className="text-xs">500+ Patients</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  'Emergency Care',
                  'Outpatient Services',
                  'Diagnostic Services',
                  'Surgical Procedures',
                  'Rehabilitation',
                  'Health Checkups'
                ].map((service, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{service}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border/50">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Phone className="h-4 w-4 mr-2" />
              Contact Department
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
