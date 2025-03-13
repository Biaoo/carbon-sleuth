
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { FileText, Search, RefreshCw, Link2, Send, Download, Clock4 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock service order data
const mockServiceOrders = [
  {
    id: 'SO-2023090101',
    clientName: 'Eco Textiles',
    serviceType: 'Carbon Footprint Verification',
    status: 'active',
    progress: 70,
    startDate: '2023-09-01',
    dueDate: '2023-10-15',
    analysts: ['Wang Li', 'John Smith'],
    description: 'Full verification of carbon footprint data for 3 textile products.'
  },
  {
    id: 'SO-2023083002',
    clientName: 'Green Electronics',
    serviceType: 'Emission Reduction Plan',
    status: 'pending',
    progress: 25,
    startDate: '2023-08-30',
    dueDate: '2023-10-30',
    analysts: ['Zhang Wei'],
    description: 'Develop comprehensive emission reduction plan for manufacturing facility.'
  },
  {
    id: 'SO-2023082503',
    clientName: 'SustainFoods',
    serviceType: 'LCA Model Development',
    status: 'completed',
    progress: 100,
    startDate: '2023-08-25',
    dueDate: '2023-09-25',
    analysts: ['Li Na', 'Sarah Johnson'],
    description: 'Develop custom LCA model for food packaging products.'
  }
];

const WorkspaceOrderManagement: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  
  // Filter and search logic
  const filteredOrders = mockServiceOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && order.status === filter;
  });
  
  // Find the selected order details
  const selectedOrderDetails = mockServiceOrders.find(order => order.id === selectedOrder);
  
  // Helper to render the status badge
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-blue-500">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
      {/* Order list section */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl">Service Orders</CardTitle>
          <div className="flex items-center space-x-2 mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-280px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow 
                    key={order.id}
                    className={`cursor-pointer hover:bg-muted ${selectedOrder === order.id ? 'bg-muted' : ''}`}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.clientName}</TableCell>
                    <TableCell>{renderStatusBadge(order.status)}</TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {/* Order details section */}
      <Card className="lg:col-span-8">
        <CardHeader>
          <CardTitle className="text-xl">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedOrderDetails ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div>
                  <Label className="text-muted-foreground">Order ID</Label>
                  <div className="font-medium mt-1">{selectedOrderDetails.id}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Client</Label>
                  <div className="font-medium mt-1">{selectedOrderDetails.clientName}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Service Type</Label>
                  <div className="font-medium mt-1">{selectedOrderDetails.serviceType}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="font-medium mt-1">{renderStatusBadge(selectedOrderDetails.status)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Start Date</Label>
                  <div className="font-medium mt-1">{selectedOrderDetails.startDate}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Due Date</Label>
                  <div className="font-medium mt-1">{selectedOrderDetails.dueDate}</div>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Progress</Label>
                <div className="mt-2">
                  <Progress value={selectedOrderDetails.progress} className="h-2" />
                  <div className="text-sm text-right mt-1">{selectedOrderDetails.progress}% Complete</div>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Assigned Analysts</Label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedOrderDetails.analysts.map((analyst, index) => (
                    <Badge key={index} variant="outline" className="border-primary">
                      {analyst}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Description</Label>
                <div className="mt-1 text-sm">{selectedOrderDetails.description}</div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update Status
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link2 className="h-4 w-4 mr-2" />
                    Share Report
                  </Button>
                  <Button size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Send to Client
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-280px)]">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Select an Order to View Details</h3>
              <p className="text-muted-foreground text-center max-w-md mt-2">
                Click on an order from the list on the left to view detailed information and manage the service order.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceOrderManagement;
