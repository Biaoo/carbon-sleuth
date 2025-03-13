
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpDown, 
  Clock, 
  FileCheck, 
  MoreHorizontal 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ServiceOrder {
  id: string;
  clientName: string;
  productName: string;
  submissionDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  serviceType: string;
}

const serviceOrders: ServiceOrder[] = [
  {
    id: 'ORD-2023-001',
    clientName: '绿环包装科技',
    productName: '可降解塑料餐具',
    submissionDate: '2023-06-20',
    status: 'in-progress',
    serviceType: '产品碳足迹评估'
  },
  {
    id: 'ORD-2023-002',
    clientName: '自然家居集团',
    productName: '竹纤维床单',
    submissionDate: '2023-06-15',
    status: 'completed',
    serviceType: '碳足迹认证'
  },
  {
    id: 'ORD-2023-003',
    clientName: '绿能科技',
    productName: '太阳能移动电源',
    submissionDate: '2023-06-10',
    status: 'pending',
    serviceType: '产品碳足迹评估'
  },
  {
    id: 'ORD-2023-004',
    clientName: '清洁能源公司',
    productName: '风力发电机部件',
    submissionDate: '2023-06-05',
    status: 'in-progress',
    serviceType: '供应链碳管理'
  },
  {
    id: 'ORD-2023-005',
    clientName: '天然食品有限公司',
    productName: '有机食品包装',
    submissionDate: '2023-06-01',
    status: 'pending',
    serviceType: '碳足迹认证'
  }
];

const WorkspaceServiceOrderList: React.FC = () => {
  const { t } = useLanguage();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">{t('status_pending')}</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{t('status_in_progress')}</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{t('status_completed')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">{t('service_orders')}</h2>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('filter_by_status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all_orders')}</SelectItem>
              <SelectItem value="pending">{t('status_pending')}</SelectItem>
              <SelectItem value="in-progress">{t('status_in_progress')}</SelectItem>
              <SelectItem value="completed">{t('status_completed')}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('filter_by_service')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all_services')}</SelectItem>
              <SelectItem value="assessment">{t('carbon_footprint_assessment')}</SelectItem>
              <SelectItem value="certification">{t('carbon_certification')}</SelectItem>
              <SelectItem value="management">{t('carbon_management')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button>
          <FileCheck className="mr-2 h-4 w-4" />
          {t('export_report')}
        </Button>
      </div>
      
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">{t('order_id')}</TableHead>
              <TableHead>
                <div className="flex items-center">
                  {t('client_name')}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>{t('product')}</TableHead>
              <TableHead>{t('service_type')}</TableHead>
              <TableHead>
                <div className="flex items-center">
                  {t('submission_date')}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead className="text-right">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.clientName}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.serviceType}</TableCell>
                <TableCell>{order.submissionDate}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                      <DropdownMenuItem>{t('view_details')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('update_status')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('contact_client')}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkspaceServiceOrderList;
