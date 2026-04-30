'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Award, 
  Search,
  Filter,
  Download,
  Plus,
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

export function StaffDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Duty</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              Average rating
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Active departments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="doctors" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="nurses">Nurses</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </div>
        </div>

        <TabsContent value="doctors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Doctors Directory</CardTitle>
              <CardDescription>
                Manage hospital doctors and their specializations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', experience: '10 years', rating: 4.8, status: 'Available' },
                  { name: 'Dr. Michael Chen', specialty: 'Neurology', experience: '8 years', rating: 4.9, status: 'In Surgery' },
                  { name: 'Dr. Emily Davis', specialty: 'Pediatrics', experience: '12 years', rating: 4.7, status: 'Available' },
                  { name: 'Dr. James Wilson', specialty: 'Orthopedics', experience: '15 years', rating: 4.6, status: 'On Leave' },
                  { name: 'Dr. Lisa Anderson', specialty: 'Dermatology', experience: '6 years', rating: 4.9, status: 'Available' },
                  { name: 'Dr. Robert Taylor', specialty: 'General Medicine', experience: '20 years', rating: 4.5, status: 'Available' },
                ].map((doctor, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                          <AvatarImage src={`/avatars/doctor-${index + 1}.jpg`} />
                          <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{doctor.name}</h3>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        </div>
                        <Badge variant={doctor.status === 'Available' ? 'default' : doctor.status === 'In Surgery' ? 'secondary' : 'outline'}>
                          {doctor.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Experience:</span>
                          <span>{doctor.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rating:</span>
                          <span>⭐ {doctor.rating}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                        <Button variant="outline" size="sm" className="flex-1">Schedule</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nurses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nursing Staff</CardTitle>
              <CardDescription>
                Manage nursing team and assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Jennifer Martinez', department: 'ICU', shift: 'Night', experience: '5 years', certification: 'RN' },
                  { name: 'Amanda Thompson', department: 'Emergency', shift: 'Day', experience: '3 years', certification: 'RN' },
                  { name: 'Rachel Green', department: 'Pediatrics', shift: 'Day', experience: '7 years', certification: 'RN' },
                  { name: 'Monica Geller', department: 'Surgery', shift: 'Night', experience: '4 years', certification: 'RN' },
                ].map((nurse, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/avatars/nurse-${index + 1}.jpg`} />
                        <AvatarFallback>{nurse.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{nurse.name}</p>
                        <p className="text-sm text-muted-foreground">{nurse.department} • {nurse.shift}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{nurse.experience}</p>
                        <p className="text-xs text-muted-foreground">{nurse.certification}</p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Administrative Staff</CardTitle>
              <CardDescription>
                Manage administrative and support staff
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'John Smith', role: 'Hospital Administrator', department: 'Management', email: 'john.smith@hospital.com' },
                  { name: 'Mary Johnson', role: 'HR Manager', department: 'Human Resources', email: 'mary.j@hospital.com' },
                  { name: 'David Brown', role: 'Finance Director', department: 'Finance', email: 'david.b@hospital.com' },
                  { name: 'Susan White', role: 'IT Manager', department: 'Information Technology', email: 'susan.w@hospital.com' },
                ].map((admin, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/avatars/admin-${index + 1}.jpg`} />
                        <AvatarFallback>{admin.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-sm text-muted-foreground">{admin.role}</p>
                        <p className="text-xs text-muted-foreground">{admin.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 mr-1" />
                        {admin.email}
                      </div>
                      <Button variant="outline" size="sm">Contact</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Schedule</CardTitle>
              <CardDescription>
                View and manage staff work schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-7">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="text-center">
                      <p className="font-medium text-sm mb-2">{day}</p>
                      <div className="space-y-2">
                        {index < 5 ? (
                          <>
                            <div className="h-8 bg-blue-100 rounded flex items-center justify-center text-xs">Day Shift</div>
                            <div className="h-8 bg-gray-100 rounded flex items-center justify-center text-xs">Night Shift</div>
                          </>
                        ) : (
                          <div className="h-8 bg-green-100 rounded flex items-center justify-center text-xs">Weekend</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium">Today's Schedule</h4>
                  {[
                    { time: '8:00 AM', staff: 'Dr. Sarah Johnson', type: 'Morning Rounds', location: 'Ward A' },
                    { time: '9:00 AM', staff: 'Dr. Michael Chen', type: 'OPD', location: 'Room 201' },
                    { time: '10:00 AM', staff: 'Jennifer Martinez', type: 'ICU Duty', location: 'ICU Unit' },
                    { time: '11:00 AM', staff: 'Dr. Emily Davis', type: 'Pediatrics OPD', location: 'Room 305' },
                  ].map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {schedule.time}
                        </div>
                        <div>
                          <p className="font-medium">{schedule.staff}</p>
                          <p className="text-sm text-muted-foreground">{schedule.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {schedule.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
