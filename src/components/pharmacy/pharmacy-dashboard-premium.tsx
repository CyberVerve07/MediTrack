'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  AlertTriangle, 
  Calendar, 
  ShoppingCart, 
  Search,
  Filter,
  Download,
  Plus,
  TrendingUp,
  Clock,
  Pill,
  Truck,
  FileText,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

export function PharmacyDashboardPremium() {
  return (
    <div className="space-y-8">
      {/* Premium Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6 border-b border-border/50">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Pharmacy Management
          </h1>
          <p className="text-muted-foreground mt-1 text-base">
            Manage medicines, inventory, and orders efficiently
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 px-4 border-medical hover:bg-secondary transition-medical">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground transition-medical">
            <Plus className="h-4 w-4 mr-2" />
            Add Medicine
          </Button>
        </div>
      </div>

      {/* Premium Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-medical-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Medicines</CardTitle>
            <div className="h-9 w-9 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,234</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
              <span className="text-emerald-600 font-medium">+12%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-medical-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alert</CardTitle>
            <div className="h-9 w-9 bg-amber-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">23</div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-amber-600 font-medium">+5 items</span>
              <span className="text-muted-foreground ml-1">need restock</span>
            </div>
            <Progress value={23} max={100} className="h-1.5 mt-3 bg-amber-100" />
          </CardContent>
        </Card>
        
        <Card className="card-medical-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expiring Soon</CardTitle>
            <div className="h-9 w-9 bg-red-50 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">8</div>
            <div className="flex items-center mt-2 text-sm">
              <Clock className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-600 font-medium">Within 30 days</span>
            </div>
            <Progress value={8} max={100} className="h-1.5 mt-3 bg-red-100" />
          </CardContent>
        </Card>
        
        <Card className="card-medical-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Orders</CardTitle>
            <div className="h-9 w-9 bg-emerald-50 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">45</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
              <span className="text-emerald-600 font-medium">+8%</span>
              <span className="text-muted-foreground ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="inventory" className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 bg-secondary/50 rounded-xl border-medical-light">
          <TabsList className="bg-white p-1 border-medical shadow-medical">
            <TabsTrigger value="inventory" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Pill className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Truck className="h-4 w-4" />
              Suppliers
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search medicines..." 
                className="pl-9 pr-4 py-2 text-sm border-medical rounded-lg bg-white shadow-medical focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64 transition-medical"
              />
            </div>
            <Button variant="outline" className="border-medical hover:bg-secondary transition-medical">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="card-medical">
            <CardHeader className="border-b border-medical-light pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-foreground">Medicine Inventory</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your hospital's medicine stock with real-time updates
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {[
                  { name: 'Paracetamol 500mg', stock: 234, status: 'In Stock', category: 'Pain Relief' },
                  { name: 'Amoxicillin 250mg', stock: 45, status: 'Low Stock', category: 'Antibiotics' },
                  { name: 'Ibuprofen 400mg', stock: 567, status: 'In Stock', category: 'Pain Relief' },
                  { name: 'Cetirizine 10mg', stock: 12, status: 'Critical', category: 'Allergy' },
                ].map((medicine, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-white rounded-lg border-medical hover:border-primary/30 hover:shadow-medical-hover transition-medical group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-secondary rounded-lg flex items-center justify-center">
                        <Pill className="h-6 w-6 text-primary/60" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{medicine.name}</p>
                        <p className="text-sm text-muted-foreground">{medicine.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="font-bold text-foreground">{medicine.stock}</p>
                        <p className="text-xs text-muted-foreground">units</p>
                      </div>
                      <Badge 
                        className={`px-3 py-1 font-medium ${
                          medicine.status === 'In Stock' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                            : medicine.status === 'Low Stock'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                        }`}
                      >
                        {medicine.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-medical">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card className="card-medical">
            <CardHeader className="border-b border-medical-light pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-foreground">Recent Orders</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track and manage all medicine orders
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {[
                  { id: 'ORD-001', medicine: 'Paracetamol 500mg', quantity: 100, status: 'Delivered', date: '2024-01-15' },
                  { id: 'ORD-002', medicine: 'Amoxicillin 250mg', quantity: 50, status: 'Pending', date: '2024-01-16' },
                  { id: 'ORD-003', medicine: 'Ibuprofen 400mg', quantity: 200, status: 'Processing', date: '2024-01-17' },
                ].map((order, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-white rounded-lg border-medical hover:border-primary/30 hover:shadow-medical-hover transition-medical group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-secondary rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary/60" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.medicine}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-foreground">{order.quantity}</p>
                        <p className="text-xs text-muted-foreground">units</p>
                      </div>
                      <Badge 
                        className={`px-3 py-1 font-medium ${
                          order.status === 'Delivered' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : order.status === 'Processing'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {order.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-medium">{order.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card className="card-medical">
            <CardHeader className="border-b border-medical-light pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-foreground">Medicine Suppliers</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage supplier information and contacts
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {[
                  { name: 'MediCare Pharmaceuticals', contact: '+91-9876543210', email: 'info@medicare.com', rating: 4.5 },
                  { name: 'HealthPlus Supplies', contact: '+91-9876543211', email: 'orders@healthplus.com', rating: 4.2 },
                  { name: 'PharmaWorld', contact: '+91-9876543212', email: 'sales@pharmaworld.com', rating: 4.8 },
                ].map((supplier, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-white rounded-lg border-medical hover:border-primary/30 hover:shadow-medical-hover transition-medical"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-secondary rounded-lg flex items-center justify-center">
                        <Truck className="h-6 w-6 text-primary/60" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{supplier.name}</p>
                        <p className="text-sm text-muted-foreground">{supplier.contact}</p>
                        <p className="text-sm text-muted-foreground">{supplier.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                        <span className="text-amber-500 text-sm">★</span>
                        <span className="font-semibold text-amber-700">{supplier.rating}</span>
                      </div>
                      <Button variant="outline" size="sm" className="border-medical hover:bg-secondary transition-medical">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="card-medical">
            <CardHeader className="border-b border-medical-light pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-foreground">Pharmacy Reports</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Generate and download comprehensive analytics
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { name: 'Inventory Report', icon: Package, desc: 'Current stock levels', color: 'blue' },
                  { name: 'Sales Report', icon: TrendingUp, desc: 'Monthly sales data', color: 'emerald' },
                  { name: 'Expiry Report', icon: Clock, desc: 'Upcoming expirations', color: 'amber' },
                  { name: 'Supplier Report', icon: Truck, desc: 'Supplier performance', color: 'purple' },
                ].map((report, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="h-24 p-4 border-medical hover:border-primary/30 hover:shadow-medical-hover transition-medical text-left justify-between group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`h-12 w-12 bg-${report.color}-50 rounded-lg flex items-center justify-center group-hover:scale-105 transition-medical`}>
                        <report.icon className={`h-6 w-6 text-${report.color}-600`} />
                      </div>
                      <div>
                        <span className="font-semibold text-foreground block">{report.name}</span>
                        <span className="text-sm text-muted-foreground">{report.desc}</span>
                      </div>
                    </div>
                    <Download className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-medical" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
