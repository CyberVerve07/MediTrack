'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  TrendingDown,
  Clock,
  Pill,
  Truck,
  FileText
} from 'lucide-react';

export function PharmacyDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Pharmacy Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage medicines, inventory, and orders efficiently
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="shadow-soft hover-lift">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-glow hover-lift">
            <Plus className="h-4 w-4 mr-2" />
            Add Medicine
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-soft hover-lift border-l-4 border-l-teal-500 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Medicines</CardTitle>
            <div className="p-2 bg-teal-100 rounded-full">
              <Package className="h-5 w-5 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,234</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft hover-lift border-l-4 border-l-orange-500 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alert</CardTitle>
            <div className="p-2 bg-orange-100 rounded-full">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">23</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-600 font-medium">+5</span>
              <span className="text-muted-foreground ml-1">items need restock</span>
            </div>
            <Progress value={23} className="h-2 mt-3" />
          </CardContent>
        </Card>
        
        <Card className="shadow-soft hover-lift border-l-4 border-l-red-500 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expiring Soon</CardTitle>
            <div className="p-2 bg-red-100 rounded-full">
              <Calendar className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">8</div>
            <div className="flex items-center mt-2 text-sm">
              <Clock className="h-4 w-4 text-orange-500 mr-1" />
              <span className="text-orange-600 font-medium">Within 30 days</span>
            </div>
            <Progress value={8} max={100} className="h-2 mt-3 bg-red-100" />
          </CardContent>
        </Card>
        
        <Card className="shadow-soft hover-lift border-l-4 border-l-blue-500 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Orders</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">45</div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+8%</span>
              <span className="text-muted-foreground ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="inventory" className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 bg-muted/30 rounded-xl">
          <TabsList className="bg-background shadow-soft p-1">
            <TabsTrigger value="inventory" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Pill className="h-4 w-4 mr-2" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Truck className="h-4 w-4 mr-2" />
              Suppliers
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search medicines..." 
                className="pl-9 pr-4 py-2 text-sm border rounded-lg bg-background shadow-soft focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-64"
              />
            </div>
            <Button variant="outline" className="shadow-soft hover-lift">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="inventory" className="space-y-4">
          <Card className="shadow-soft overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-teal-900">Medicine Inventory</CardTitle>
                  <CardDescription className="text-teal-700">
                    Manage your hospital's medicine stock with real-time updates
                  </CardDescription>
                </div>
                <div className="p-3 bg-white rounded-full shadow-soft">
                  <Pill className="h-6 w-6 text-teal-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {/* Sample medicine items */}
                {[
                  { name: 'Paracetamol 500mg', stock: 234, status: 'In Stock', category: 'Pain Relief', icon: '💊' },
                  { name: 'Amoxicillin 250mg', stock: 45, status: 'Low Stock', category: 'Antibiotics', icon: '💉' },
                  { name: 'Ibuprofen 400mg', stock: 567, status: 'In Stock', category: 'Pain Relief', icon: '💊' },
                  { name: 'Cetirizine 10mg', stock: 12, status: 'Critical', category: 'Allergy', icon: '🌡️' },
                ].map((medicine, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-background rounded-xl border border-border/50 hover:border-teal-200 hover:shadow-medium transition-all duration-300 hover-lift"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center text-2xl shadow-soft">
                        {medicine.icon}
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
                        className={`px-3 py-1 ${
                          medicine.status === 'In Stock' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : medicine.status === 'Low Stock'
                            ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {medicine.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="hover:bg-teal-50 hover:border-teal-200 transition-colors">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card className="shadow-soft overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-blue-900">Recent Orders</CardTitle>
                  <CardDescription className="text-blue-700">
                    Track and manage all medicine orders
                  </CardDescription>
                </div>
                <div className="p-3 bg-white rounded-full shadow-soft">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {[
                  { id: 'ORD-001', medicine: 'Paracetamol 500mg', quantity: 100, status: 'Delivered', date: '2024-01-15', icon: '✅' },
                  { id: 'ORD-002', medicine: 'Amoxicillin 250mg', quantity: 50, status: 'Pending', date: '2024-01-16', icon: '⏳' },
                  { id: 'ORD-003', medicine: 'Ibuprofen 400mg', quantity: 200, status: 'Processing', date: '2024-01-17', icon: '📦' },
                ].map((order, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-background rounded-xl border border-border/50 hover:border-blue-200 hover:shadow-medium transition-all duration-300 hover-lift"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-lg shadow-soft">
                        {order.icon}
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
                        className={`px-3 py-1 ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
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
          <Card className="shadow-soft overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-purple-900">Medicine Suppliers</CardTitle>
                  <CardDescription className="text-purple-700">
                    Manage supplier information and contacts
                  </CardDescription>
                </div>
                <div className="p-3 bg-white rounded-full shadow-soft">
                  <Truck className="h-6 w-6 text-purple-600" />
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
                    className="flex items-center justify-between p-4 bg-background rounded-xl border border-border/50 hover:border-purple-200 hover:shadow-medium transition-all duration-300 hover-lift"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-2xl shadow-soft">
                        🏭
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{supplier.name}</p>
                        <p className="text-sm text-muted-foreground">{supplier.contact}</p>
                        <p className="text-sm text-muted-foreground">{supplier.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold text-yellow-700">{supplier.rating}</span>
                      </div>
                      <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-200 transition-colors">
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
          <Card className="shadow-soft overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Pharmacy Reports</CardTitle>
                  <CardDescription className="text-gray-700">
                    Generate and download comprehensive analytics
                  </CardDescription>
                </div>
                <div className="p-3 bg-white rounded-full shadow-soft">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { name: 'Inventory Report', icon: '📦', color: 'from-teal-500 to-cyan-500', desc: 'Current stock levels' },
                  { name: 'Sales Report', icon: '💰', color: 'from-blue-500 to-indigo-500', desc: 'Monthly sales data' },
                  { name: 'Expiry Report', icon: '⏰', color: 'from-orange-500 to-red-500', desc: 'Upcoming expirations' },
                  { name: 'Supplier Report', icon: '🏭', color: 'from-purple-500 to-pink-500', desc: 'Supplier performance' },
                ].map((report, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="h-24 flex-col items-start justify-between p-4 hover:shadow-medium hover:border-gray-300 transition-all duration-300 hover-lift text-left group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${report.color} rounded-lg flex items-center justify-center text-xl shadow-soft group-hover:scale-110 transition-transform`}>
                          {report.icon}
                        </div>
                        <div>
                          <span className="font-semibold text-foreground">{report.name}</span>
                          <p className="text-xs text-muted-foreground">{report.desc}</p>
                        </div>
                      </div>
                      <Download className="h-5 w-5 text-muted-foreground group-hover:text-teal-500 transition-colors" />
                    </div>
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
