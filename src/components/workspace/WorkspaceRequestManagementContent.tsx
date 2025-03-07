
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Mail, 
  Phone, 
  Send, 
  FileText, 
  Clock, 
  Download,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data
const getMockRequests = (language: 'en' | 'zh') => {
  if (language === 'en') {
    return [
      {
        id: 'req-001',
        supplier: 'Shanghai Green Energy Tech Co., Ltd.',
        product: 'Solar Panel Model-SE300',
        status: 'pending',
        date: '2023-11-15',
        deadline: '2023-11-30',
        method: 'email',
        contact: 'contact@greenenergy.com',
      },
      {
        id: 'req-002',
        supplier: 'Jiangsu New Materials Technology Co., Ltd.',
        product: 'Composite Material XM-200',
        status: 'completed',
        date: '2023-11-10',
        deadline: '2023-11-25',
        method: 'email',
        contact: 'info@jsnewmaterial.com',
      },
      {
        id: 'req-003',
        supplier: 'Guangdong High-Efficiency Energy Co., Ltd.',
        product: 'Lithium Battery Component LB-500',
        status: 'rejected',
        date: '2023-11-05',
        deadline: '2023-11-20',
        method: 'wechat',
        contact: 'gdhighpower@example.com',
      },
      {
        id: 'req-004',
        supplier: 'Beijing Clean Energy Technology Co., Ltd.',
        product: 'Wind Turbine Blade FP-120',
        status: 'waiting',
        date: '2023-11-01',
        deadline: '2023-11-16',
        method: 'dingtalk',
        contact: 'bj_cleanenergy@example.com',
      },
    ];
  }
  return [
    {
      id: 'req-001',
      supplier: '上海绿能科技有限公司',
      product: '太阳能电池板 Model-SE300',
      status: 'pending',
      date: '2023-11-15',
      deadline: '2023-11-30',
      method: 'email',
      contact: 'contact@greenenergy.com',
    },
    {
      id: 'req-002',
      supplier: '江苏新材料科技股份有限公司',
      product: '复合材料 XM-200',
      status: 'completed',
      date: '2023-11-10',
      deadline: '2023-11-25',
      method: 'email',
      contact: 'info@jsnewmaterial.com',
    },
    {
      id: 'req-003',
      supplier: '广东高效能源有限公司',
      product: '锂电池组件 LB-500',
      status: 'rejected',
      date: '2023-11-05',
      deadline: '2023-11-20',
      method: 'wechat',
      contact: 'gdhighpower@example.com',
    },
    {
      id: 'req-004',
      supplier: '北京清洁能源技术有限公司',
      product: '风力发电机叶片 FP-120',
      status: 'waiting',
      date: '2023-11-01',
      deadline: '2023-11-16',
      method: 'dingtalk',
      contact: 'bj_cleanenergy@example.com',
    },
  ];
};

const WorkspaceRequestManagementContent: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const { t, language } = useLanguage();
  const mockRequests = getMockRequests(language);

  // Status mapping
  const statusMap = {
    pending: { 
      label: language === 'zh' ? '等待回复' : 'Awaiting Response', 
      color: 'bg-amber-500' 
    },
    completed: { 
      label: language === 'zh' ? '已完成' : 'Completed', 
      color: 'bg-green-500' 
    },
    rejected: { 
      label: language === 'zh' ? '已拒绝' : 'Rejected', 
      color: 'bg-red-500' 
    },
    waiting: { 
      label: language === 'zh' ? '准备发送' : 'Ready to Send', 
      color: 'bg-blue-500' 
    },
  };

  // Method mapping
  const methodMap = {
    email: { label: language === 'zh' ? '邮件' : 'Email', icon: Mail },
    sms: { label: language === 'zh' ? '短信' : 'SMS', icon: Phone },
    wechat: { label: language === 'zh' ? '微信' : 'WeChat', icon: Send },
    dingtalk: { label: language === 'zh' ? '钉钉' : 'DingTalk', icon: Send },
  };

  // Handle select request
  const handleSelectRequest = (request: any) => {
    setSelectedRequest(request);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">{t('request_management')}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side request list */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-3">{t('request_records')}</h2>
          
          <div className="flex items-center space-x-2 mb-4">
            <Input placeholder={t('search_requests')} className="max-w-xs" />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('filter_status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_statuses')}</SelectItem>
                <SelectItem value="pending">{statusMap.pending.label}</SelectItem>
                <SelectItem value="completed">{statusMap.completed.label}</SelectItem>
                <SelectItem value="rejected">{statusMap.rejected.label}</SelectItem>
                <SelectItem value="waiting">{statusMap.waiting.label}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            {mockRequests.map((request) => (
              <Card 
                key={request.id} 
                className={`cursor-pointer transition-all ${selectedRequest?.id === request.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleSelectRequest(request)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{request.supplier}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{request.product}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{request.date}</span>
                      </div>
                    </div>
                    <Badge className={statusMap[request.status as keyof typeof statusMap].color}>
                      {statusMap[request.status as keyof typeof statusMap].label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Right side request details */}
        <div className="lg:col-span-2">
          {selectedRequest ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{t('request_details')}</CardTitle>
                  <Badge className={statusMap[selectedRequest.status as keyof typeof statusMap].color}>
                    {statusMap[selectedRequest.status as keyof typeof statusMap].label}
                  </Badge>
                </div>
                <CardDescription>
                  {t('request_id')}: {selectedRequest.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('supplier')}</h3>
                      <p className="font-medium">{selectedRequest.supplier}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('product')}</h3>
                      <p className="font-medium">{selectedRequest.product}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('contact_method')}</h3>
                      <div className="flex items-center">
                        {React.createElement(
                          methodMap[selectedRequest.method as keyof typeof methodMap].icon, 
                          { className: "h-4 w-4 mr-2" }
                        )}
                        <p>{selectedRequest.contact}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('send_date')}</h3>
                      <p>{selectedRequest.date}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('response_deadline')}</h3>
                      <p>{selectedRequest.deadline}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('response_progress')}</h3>
                      <Progress value={selectedRequest.status === 'completed' ? 100 : 30} className="h-2 mt-2" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">{t('request_content')}</h3>
                  <div className="bg-muted/50 rounded-md p-4 text-sm">
                    {language === 'zh' ? (
                      <>
                        <p>尊敬的供应商：</p>
                        <br />
                        <p>您好！我们是贵司产品的采购方，正在进行供应链碳足迹评估工作。我们的系统对贵司的{selectedRequest.product}进行了碳足迹预测分析。为了确保数据准确性，我们希望能获取贵司的实际碳足迹数据。</p>
                        <br />
                        <p>我们的预测结果显示，该产品的碳足迹约为 45.6 kgCO2e/件。如果贵司有实际测算数据，请提供给我们，以便我们更准确地评估整体供应链的碳排放情况。</p>
                        <br />
                        <p>感谢您的配合！</p>
                      </>
                    ) : (
                      <>
                        <p>Dear Supplier:</p>
                        <br />
                        <p>Hello! We are a purchaser of your products and are conducting a supply chain carbon footprint assessment. Our system has performed a carbon footprint prediction analysis for your {selectedRequest.product}. To ensure data accuracy, we hope to obtain your actual carbon footprint data.</p>
                        <br />
                        <p>Our prediction results show that the carbon footprint of this product is approximately 45.6 kgCO2e/unit. If your company has actual measurement data, please provide it to us so that we can more accurately assess the carbon emissions of the entire supply chain.</p>
                        <br />
                        <p>Thank you for your cooperation!</p>
                      </>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">{t('request_attachments')}</h3>
                  <div className="flex items-center justify-between bg-muted/50 rounded-md p-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>{language === 'zh' ? '产品碳足迹预测报告.pdf' : 'Product Carbon Footprint Prediction Report.pdf'}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      {t('download')}
                    </Button>
                  </div>
                </div>
                
                {selectedRequest.status === 'completed' && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-medium">{t('supplier_response')}</h3>
                      <div className="bg-muted/50 rounded-md p-4 text-sm">
                        {language === 'zh' ? (
                          <>
                            <p>感谢您的数据请求。</p>
                            <br />
                            <p>我们已审核了您的请求，并在附件中提供了我们产品的实际碳足迹数据。根据我们的测算，{selectedRequest.product}的碳足迹为 42.3 kgCO2e/件，略低于您的预测值。</p>
                            <br />
                            <p>如果您需要更详细的数据或有任何问题，请随时联系我们。</p>
                          </>
                        ) : (
                          <>
                            <p>Thank you for your data request.</p>
                            <br />
                            <p>We have reviewed your request and provided the actual carbon footprint data for our product in the attachment. According to our measurements, the carbon footprint of {selectedRequest.product} is 42.3 kgCO2e/unit, slightly lower than your predicted value.</p>
                            <br />
                            <p>If you need more detailed data or have any questions, please feel free to contact us.</p>
                          </>
                        )}
                      </div>
                      <div className="flex items-center justify-between bg-muted/50 rounded-md p-3">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                          <span>{language === 'zh' ? '产品实际碳足迹数据.xlsx' : 'Product Actual Carbon Footprint Data.xlsx'}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          {t('download')}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  {t('send_reminder')}
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">
                    {t('export_details')}
                  </Button>
                  {selectedRequest.status === 'pending' && (
                    <Button variant="destructive">
                      {t('cancel_request')}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border border-dashed rounded-lg p-10">
              <div className="text-center">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{t('select_request_view_details')}</h3>
                <p className="text-muted-foreground max-w-md">
                  {t('select_request_description')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceRequestManagementContent;
